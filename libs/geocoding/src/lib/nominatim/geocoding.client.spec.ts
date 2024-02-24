import fetch from 'node-fetch';
import { GeocodingClient } from './geocoding.client';
import { Test } from '@nestjs/testing';
import { ConfigType } from '@nestjs/config';
import nominatimConfiguration from '../config/nominatim.configuration';

jest.mock('node-fetch');

const userAgent = 'Test User Agent';
const apiUrl = 'https://example.com/api';

const mockConfig: ConfigType<typeof nominatimConfiguration> = {
  userAgent,
  apiUrl,
  timeBetweenRequestsMs: 0,
};

describe('GeocodingClient', () => {
  let client: GeocodingClient;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GeocodingClient,
        {
          provide: nominatimConfiguration.KEY,
          useValue: mockConfig,
        },
      ],
    }).compile();

    client = module.get<GeocodingClient>(GeocodingClient);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('geocode', () => {
    it('should perform geocoding successfully with string query', async () => {
      const mockResponse = [
        {
          /* mock geocoding response */
        },
      ];

      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const query = 'London';
      const result = await client.geocode(query);

      expect(fetch).toHaveBeenCalledWith(
        `${apiUrl}?format=geojson&q=${query}`,
        {
          headers: {
            'User-Agent': userAgent,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should perform geocoding successfully with structured query', async () => {
      const mockResponse = [
        {
          /* mock geocoding response */
        },
      ];

      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const query = { city: 'London', country: 'UK' };
      const result = await client.geocode(query);

      expect(fetch).toHaveBeenCalledWith(
        `${apiUrl}?format=geojson&city=London&country=UK`,
        {
          headers: {
            'User-Agent': userAgent,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error if request fails', async () => {
      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const query = 'London';
      await expect(client.geocode(query)).rejects.toThrowError(
        'Request failed with status 404'
      );
    });

    it('should throw error if fetch fails', async () => {
      (fetch as unknown as jest.Mock).mockRejectedValueOnce(
        new Error('Mocked fetch error')
      );

      const query = 'London';
      await expect(client.geocode(query)).rejects.toThrowError(
        'Error performing geocoding: Mocked fetch error'
      );
    });
  });
});
