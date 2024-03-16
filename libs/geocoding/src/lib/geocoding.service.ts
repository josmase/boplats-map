import { Inject, Injectable, Logger } from '@nestjs/common';
import { hashQuery } from './key-hasher';
import { GeocodingClient } from './nominatim/geocoding.client';
import { StructuredQuery } from './nominatim/request';
import { GeocodingFeatureResponse } from './nominatim/response';
import { GeocodingFeature } from './repository/geocoding.schema';
import { GeocodingRepository } from './repository/geocoding.repository';
import nominatimConfiguration from './config/nominatim.configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GeocodingService {
  private lastQueryTimestamp: number = 0;

  constructor(
    private readonly geocodingClient: GeocodingClient,
    private readonly geocodingRepository: GeocodingRepository,
    @Inject(nominatimConfiguration.KEY)
    private readonly config: ConfigType<typeof nominatimConfiguration>
  ) {}

  async fetchAndSaveGeocodingData(
    query: string | Partial<StructuredQuery>
  ): Promise<GeocodingFeature> {
    try {
      const queryId = hashQuery(query);
      const existingMatch = await this.geocodingRepository.findById(queryId);
      if (existingMatch) {
        Logger.debug(`${queryId}: Cache hit`);
        return existingMatch;
      }

      Logger.debug(`${queryId}: Attempting to geocode:`, query);

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
    await this.rateLinmit(this.config.timeBetweenRequestsMs);
    const response = await this.geocodingClient.geocode(query);
    this.lastQueryTimestamp = Date.now();
    return response;
  }

  private async rateLinmit(rateLimit: number) {
    const currentTime = Date.now();
    const timeElapsedMs = currentTime - this.lastQueryTimestamp;
    Logger.debug(
      `Checking if request needs to be throotled. Rate limit ${rateLimit}ms, time since last request ${timeElapsedMs}`
    );
    if (timeElapsedMs < rateLimit) {
      const delay = rateLimit - timeElapsedMs;
      Logger.debug(`Too many requests, delaying for ${delay}ms`);
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
      Logger.log('Best Match:');
      Logger.log(bestMatch);

      Logger.log('Discarded Features:');
      Logger.log(discardedFeatures);
    }
    return bestMatch;
  }
}
