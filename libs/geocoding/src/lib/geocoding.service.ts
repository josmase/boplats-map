import type { GeocodingFeature, StructuredQuery } from "../mod.ts";
import type { NominatimConfiguration } from "./config/nominatim.configuration.ts";
import type { KeyHasher } from "./key-hasher.ts";
import type { GeocodingClient } from "./nominatim/geocoding.client.ts";
import type { GeocodingFeatureResponse } from "./nominatim/response.ts";
import type { GeocodingRepository } from "./repository/geocoding.repository.ts";

export class GeocodingService {
  private lastQueryTimestamp: number = 0;

  constructor(
    private readonly geocodingClient: GeocodingClient,
    private readonly geocodingRepository: GeocodingRepository,
    private readonly config: NominatimConfiguration,
    private readonly keyHasher: KeyHasher,
  ) {}

  async fetchAndSaveGeocodingData(
    query: string | Partial<StructuredQuery>,
  ): Promise<GeocodingFeature> {
    try {
      const queryId = this.keyHasher.hashQuery(query);
      const existingMatch = await this.geocodingRepository.findById(queryId);
      if (existingMatch) {
        console.debug(`${queryId}: Cache hit`);
        return existingMatch;
      }

      console.debug(`${queryId}: Attempting to geocode:`, query);

      const response = await this.makeRateLimitedRequest(query);

      const bestMatchForQuery = this.getBestMatch(response.features);
      return await this.geocodingRepository.create({
        queryId,
        ...bestMatchForQuery,
      });
    } catch (error) {
      throw new Error(
        `Error fetching and saving geocoding data: ${error}`,
      );
    }
  }

  private async makeRateLimitedRequest(
    query: string | Partial<StructuredQuery>,
  ) {
    await this.rateLinmit(this.config.timeBetweenRequestsMs);
    const response = await this.geocodingClient.geocode(query);
    this.lastQueryTimestamp = Date.now();
    return response;
  }

  private async rateLinmit(rateLimit: number) {
    const currentTime = Date.now();
    const timeElapsedMs = currentTime - this.lastQueryTimestamp;
    console.debug(
      `Checking if request needs to be throotled. Rate limit ${rateLimit}ms, time since last request ${timeElapsedMs}`,
    );
    if (timeElapsedMs < rateLimit) {
      const delay = rateLimit - timeElapsedMs;
      console.debug(`Too many requests, delaying for ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  private getBestMatch(features: GeocodingFeatureResponse[]) {
    const sortedFeatures = [...features].sort(
      (feature1, feature2) =>
        feature1.properties.place_rank - feature2.properties.place_rank,
    );

    const bestMatch = sortedFeatures.length > 0 ? sortedFeatures[0] : null;
    const discardedFeatures = sortedFeatures.slice(1);
    if (discardedFeatures.length > 0) {
      console.log("Best Match:");
      console.log(bestMatch);

      console.log("Discarded Features:");
      console.log(discardedFeatures);
    }
    return bestMatch;
  }
}
