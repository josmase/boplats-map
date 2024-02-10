import fetch from 'node-fetch';
import { GeocodingClient } from './geocoding-client';

jest.mock('node-fetch');

describe('GeocodingClient', () => {
  const userAgent = 'Test User Agent';
  const apiUrl = 'https://example.com/api';

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
      const client = new GeocodingClient(userAgent, apiUrl);

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
      const client = new GeocodingClient(userAgent, apiUrl);

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
      const client = new GeocodingClient(userAgent, apiUrl);

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
      const client = new GeocodingClient(userAgent, apiUrl);

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
