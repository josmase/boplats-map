import fetch from 'node-fetch';
import { StructuredQuery } from './request';
import { GeocodingResponse } from './response';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import nominatimConfiguration from '../config/nominatim.configuration';

interface QueryParams extends StructuredQuery {
  q: string;
  format: 'geojson';
}
@Injectable()
export class GeocodingClient {
  constructor(
    @Inject(nominatimConfiguration.KEY)
    private readonly config: ConfigType<typeof nominatimConfiguration>
  ) {}

  async geocode(query: string | Partial<StructuredQuery>) {
    const queryParams = this.createQueryParams(query);

    const url = `${this.config.apiUrl}?${queryParams}`;

    try {
      Logger.debug('Attempting to geocode:', url);
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.config.userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: GeocodingResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error performing geocoding: ${error.message}`);
    }
  }

  private createQueryParams(query: string | Partial<StructuredQuery>) {
    let params: Partial<QueryParams> = {
      format: 'geojson',
    };
    if (typeof query === 'string') {
      params = { ...params, q: query };
    } else {
      params = { ...params, ...query };
    }

    const queryParams = new URLSearchParams(params);
    return queryParams;
  }
}
