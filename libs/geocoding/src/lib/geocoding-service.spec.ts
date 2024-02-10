import { GeocodingClient } from './nominatim/geocoding-client';
import { GeocodingResponse } from './nominatim/response';
import { GeocodingRepository } from './repository/geocoding-repository';
import { GeocodingService } from './geocoding-service';
import { StructuredQuery } from './nominatim/request';
import { hashQuery } from './key-hasher';
import { GeocodingFeature } from './repository/geocoding-model';

jest.mock('./nominatim/geocoding-client');
jest.mock('./repository/geocoding-repository');
jest.mock('./key-hasher');

describe('GeocodingService', () => {
  let geocodingClient: GeocodingClient;
  let geocodingRepository: GeocodingRepository;
  let geocodingService: GeocodingService;

  beforeEach(() => {
    geocodingClient = new GeocodingClient('Mock user agent', 'Mock api url');
    geocodingRepository = new GeocodingRepository(null);
    geocodingService = new GeocodingService(
      geocodingClient,
      geocodingRepository,
      1
    );
  });

  describe('fetchAndSaveGeocodingData', () => {
    describe('StructuredQuery', () => {
      it('should fetch and save geocoding data successfully when no existing match is found', async () => {
        const query: Partial<StructuredQuery> = { city: 'New York' };
        const queryId = 'hashedQueryId';
        const geocodingFeature: GeocodingFeature = {
          queryId: queryId,
          type: 'Feature',
          properties: {
            place_id: 123,
            osm_type: 'node',
            osm_id: 456,
            place_rank: 10,
            category: 'city',
            type: 'city',
            importance: 0.9,
            addresstype: 'city',
            name: 'New York',
            display_name: 'New York, USA',
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: 'Point',
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const response: GeocodingResponse = {
          type: 'Mock type',
          licence: 'Mock license',
          features: [geocodingFeature],
        };

        // Mock the methods and return values
        (hashQuery as jest.Mock).mockReturnValue(queryId);
        (geocodingClient.geocode as jest.Mock).mockResolvedValue(response);
        (geocodingRepository.findById as jest.Mock).mockResolvedValue(null);
        (geocodingRepository.create as jest.Mock).mockResolvedValue(
          geocodingFeature
        );

        // Call the method under test
        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        // Assertions
        expect(result).toEqual(geocodingFeature);
        expect(hashQuery).toHaveBeenCalledWith(query);
        expect(geocodingClient.geocode).toHaveBeenCalledWith(query);
        expect(geocodingRepository.findById).toHaveBeenCalledWith(queryId);
        expect(geocodingRepository.create).toHaveBeenCalledWith(
          geocodingFeature
        );
      });
      it('should return existing match when found in the repository', async () => {
        const query: Partial<StructuredQuery> = { city: 'New York' };
        const queryId = 'hashedQueryId';
        const existingMatch: GeocodingFeature = {
          queryId: queryId,
          type: 'Feature',
          properties: {
            place_id: 123,
            osm_type: 'node',
            osm_id: 456,
            place_rank: 10,
            category: 'city',
            type: 'city',
            importance: 0.9,
            addresstype: 'city',
            name: 'New York',
            display_name: 'New York, USA',
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: 'Point',
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Mock the methods and return values
        (hashQuery as jest.Mock).mockReturnValue(queryId);
        (geocodingRepository.findById as jest.Mock).mockResolvedValue(
          existingMatch
        );

        // Call the method under test
        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        // Assertions
        expect(result).toEqual(existingMatch);
        expect(hashQuery).toHaveBeenCalledWith(query);
        expect(geocodingRepository.findById).toHaveBeenCalledWith(queryId);
        expect(geocodingClient.geocode).not.toHaveBeenCalled(); // Ensure geocode method was not called
        expect(geocodingRepository.create).not.toHaveBeenCalled(); // Ensure create method was not called
      });
    });
    describe('string query', () => {
      it('should fetch and save geocoding data successfully when no existing match is found', async () => {
        const query = 'New York';
        const queryId = 'hashedQueryId';
        const geocodingFeature: GeocodingFeature = {
          queryId: queryId,
          type: 'Feature',
          properties: {
            place_id: 123,
            osm_type: 'node',
            osm_id: 456,
            place_rank: 10,
            category: 'city',
            type: 'city',
            importance: 0.9,
            addresstype: 'city',
            name: 'New York',
            display_name: 'New York, USA',
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: 'Point',
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const response: GeocodingResponse = {
          type: 'Mock type',
          licence: 'Mock license',
          features: [geocodingFeature],
        };

        (hashQuery as jest.Mock).mockReturnValue(queryId);
        (geocodingClient.geocode as jest.Mock).mockResolvedValue(response);
        (geocodingRepository.findById as jest.Mock).mockResolvedValue(null);
        (geocodingRepository.create as jest.Mock).mockResolvedValue(
          geocodingFeature
        );

        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        expect(result).toEqual(geocodingFeature);
        expect(hashQuery).toHaveBeenCalledWith(query);
        expect(geocodingClient.geocode).toHaveBeenCalledWith(query);
        expect(geocodingRepository.findById).toHaveBeenCalledWith(queryId);
        expect(geocodingRepository.create).toHaveBeenCalledWith(
          geocodingFeature
        );
      });

      it('should return existing match without fetching when existing match is found', async () => {
        const query = 'New York';
        const queryId = 'hashedQueryId';
        const geocodingFeature: GeocodingFeature = {
          queryId: queryId,
          type: 'Feature',
          properties: {
            place_id: 123,
            osm_type: 'node',
            osm_id: 456,
            place_rank: 10,
            category: 'city',
            type: 'city',
            importance: 0.9,
            addresstype: 'city',
            name: 'New York',
            display_name: 'New York, USA',
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: 'Point',
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        (hashQuery as jest.Mock).mockReturnValue(queryId);
        (geocodingRepository.findById as jest.Mock).mockResolvedValue(
          geocodingFeature
        );

        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        expect(result).toEqual(geocodingFeature);
        expect(hashQuery).toHaveBeenCalledWith(query);
        expect(geocodingClient.geocode).not.toHaveBeenCalled();
        expect(geocodingRepository.findById).toHaveBeenCalledWith(queryId);
        expect(geocodingRepository.create).not.toHaveBeenCalled();
      });
    });
    it('should throw an error when an error occurs during fetching and saving geocoding data', async () => {
      const query = 'New York';
      const errorMessage = 'Failed to fetch geocoding data';
      (hashQuery as jest.Mock).mockReturnValue('hashQueryId');
      (geocodingClient.geocode as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(
        geocodingService.fetchAndSaveGeocodingData(query)
      ).rejects.toThrow(errorMessage);
    });
  });
});
