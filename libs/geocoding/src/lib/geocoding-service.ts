import { GeocodingClient } from './nominatim/geocoding-client';
import { StructuredQuery } from './nominatim/request';
import { GeocodingFeature, GeocodingResponse } from './nominatim/response';
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
      const queryId = this.geocodingClient.hashQuery(query);
      const existingMatch = await this.geocodingRepository.findById(queryId);
      if (existingMatch) {
        return existingMatch;
      }
      await this.rateLinmit(this.timeBetweenRequestsMs);

      const response = await this.geocodingClient.geocode(query);
      const bestMatchForQuery = this.getBestMatch(response.features);
      return await this.geocodingRepository.create(queryId, bestMatchForQuery);
    } catch (error) {
      throw new Error(
        `Error fetching and saving geocoding data: ${error.message}`
      );
    }
  }

  private async rateLinmit(rateLimit: number) {
    const currentTime = Date.now();
    const timeElapsedMs = currentTime - this.lastQueryTimestamp;
    if (timeElapsedMs < rateLimit) {
      const delay = rateLimit - timeElapsedMs;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  private getBestMatch(features: GeocodingFeature[]) {
    const sortedFeatures = [...features].sort(
      (feature1, feature2) =>
        feature1.properties.place_rank - feature2.properties.place_rank
    );
    return sortedFeatures.length > 0 ? sortedFeatures[0] : null;
  }
}
