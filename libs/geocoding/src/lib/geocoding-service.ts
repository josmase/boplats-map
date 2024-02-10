import { hashQuery } from './key-hasher';
import { GeocodingClient } from './nominatim/geocoding-client';
import { StructuredQuery } from './nominatim/request';
import { GeocodingFeatureResponse } from './nominatim/response';
import {
  GeocodingFeature,
  GeocodingFeatureModel,
} from './repository/geocoding-model';
import { GeocodingRepository } from './repository/geocoding-repository';

export class GeocodingService {
  private lastQueryTimestamp: number = 0;

  constructor(
    private readonly geocodingClient: GeocodingClient,
    private readonly geocodingRepository: GeocodingRepository,
    private readonly timeBetweenRequestsMs: number
  ) {}

  async fetchAndSaveGeocodingData(
    query: string | Partial<StructuredQuery>
  ): Promise<GeocodingFeature> {
    try {
      const queryId = hashQuery(query);
      console.debug(`${queryId}: Attempting to geocode:`, query);
      const existingMatch = await this.geocodingRepository.findById(queryId);
      if (existingMatch) {
        console.debug(`${queryId}: Cache hit`);
        return existingMatch;
      }

      const response = await this.makeRateLimitedRequest(query);

      const bestMatchForQuery = this.getBestMatch(response.features);
      return await this.geocodingRepository.create({
        queryId,
        ...bestMatchForQuery,
      });
    } catch (error) {
      throw new Error(
        `Error fetching and saving geocoding data: ${error.message}`
      );
    }
  }

  private async makeRateLimitedRequest(
    query: string | Partial<StructuredQuery>
  ) {
    await this.rateLinmit(this.timeBetweenRequestsMs);
    const response = await this.geocodingClient.geocode(query);
    this.lastQueryTimestamp = Date.now();
    return response;
  }

  private async rateLinmit(rateLimit: number) {
    const currentTime = Date.now();
    const timeElapsedMs = currentTime - this.lastQueryTimestamp;
    console.debug(
      `Checking if request needs to be throotled. Rate limit ${rateLimit}ms, time since last request ${timeElapsedMs}`
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
        feature1.properties.place_rank - feature2.properties.place_rank
    );

    const bestMatch = sortedFeatures.length > 0 ? sortedFeatures[0] : null;
    const discardedFeatures = sortedFeatures.slice(1);
    if (discardedFeatures.length > 0) {
      console.log('Best Match:');
      console.dir(bestMatch);

      console.log('Discarded Features:');
      console.dir(discardedFeatures);
    }
    return bestMatch;
  }
}

interface GeoCodingConfig {
  userAgent: string;
  apiUrl: string;
  timeBetweenRequestsMs: number;
}

export function createGeoCodingService({
  userAgent,
  apiUrl,
  timeBetweenRequestsMs,
}: GeoCodingConfig) {
  return new GeocodingService(
    new GeocodingClient(userAgent, apiUrl),
    new GeocodingRepository(GeocodingFeatureModel),
    timeBetweenRequestsMs
  );
}
