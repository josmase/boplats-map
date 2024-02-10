import fetch from 'node-fetch';
import { StructuredQuery } from './request';
import { GeocodingResponse } from './response';
import { createHash } from 'crypto';

interface QueryParams extends StructuredQuery {
  q: string;
  format: 'geojson';
}

export class GeocodingClient {
  constructor(
    private readonly userAgent: string,
    private readonly apiUrl: string
  ) {}

  async geocode(query: string | Partial<StructuredQuery>) {
    const queryParams = this.createQueryParams(query);

    const url = `${this.apiUrl}?${queryParams}`;

    try {
      console.debug('Attempting to geocode:', url);
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
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
