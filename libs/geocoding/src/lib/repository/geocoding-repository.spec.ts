import { GeocodingFeature, GeocodingFeatureModel } from './geocoding-model';
import { GeocodingRepository } from './geocoding-repository';

jest.mock('./geocoding-model');

describe('GeocodingRepository', () => {
  let geocodingRepository: GeocodingRepository;

  beforeEach(() => {
    geocodingRepository = new GeocodingRepository(GeocodingFeatureModel);
  });

  describe('create', () => {
    it('should call model.create with correct parameters', async () => {
      const queryId = 'testQueryId';
      const feature: GeocodingFeature = {
        queryId: 'queryId',
        type: 'Feature',
        properties: {
          place_id: 123,
          osm_type: 'node',
          osm_id: 456,
          place_rank: 20,
          category: 'boundary',
          type: 'administrative',
          importance: 0.366,
          addresstype: 'suburb',
          name: 'TestName',
          display_name: 'Test Display Name',
        },
        bbox: [1, 2, 3, 4],
        geometry: {
          type: 'Point',
          coordinates: [5, 6],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (GeocodingFeatureModel.create as jest.Mock).mockResolvedValue(feature);

      await geocodingRepository.create(feature);

      expect(GeocodingFeatureModel.create).toHaveBeenCalledWith(feature);
    });

    it('should return the created feature', async () => {
      const queryId = 'testQueryId';
      const feature: GeocodingFeature = {
        queryId: queryId,
        type: 'Feature',
        properties: {
          place_id: 123,
          osm_type: 'node',
          osm_id: 456,
          place_rank: 20,
          category: 'boundary',
          type: 'administrative',
          importance: 0.366,
          addresstype: 'suburb',
          name: 'TestName',
          display_name: 'Test Display Name',
        },
        bbox: [1, 2, 3, 4],
        geometry: {
          type: 'Point',
          coordinates: [5, 6],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (GeocodingFeatureModel.create as jest.Mock).mockResolvedValue(feature);

      const result = await geocodingRepository.create(feature);

      expect(result).toEqual(feature);
    });
  });

  describe('findById', () => {
    it('should call model.findOne with correct _id', async () => {
      const queryId = 'testId';

      (GeocodingFeatureModel.findOne as jest.Mock).mockResolvedValue(null);

      await geocodingRepository.findById(queryId);

      expect(GeocodingFeatureModel.findOne).toHaveBeenCalledWith({ queryId });
    });

    it('should return the found feature', async () => {
      const queryId = 'testId';
      const feature: GeocodingFeature = {
        queryId: queryId,
        type: 'Feature',
        properties: {
          place_id: 123,
          osm_type: 'node',
          osm_id: 456,
          place_rank: 20,
          category: 'boundary',
          type: 'administrative',
          importance: 0.366,
          addresstype: 'suburb',
          name: 'TestName',
          display_name: 'Test Display Name',
        },
        bbox: [1, 2, 3, 4],
        geometry: {
          type: 'Point',
          coordinates: [5, 6],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (GeocodingFeatureModel.findOne as jest.Mock).mockResolvedValue(feature);

      const result = await geocodingRepository.findById(queryId);

      expect(result).toEqual(feature);
    });
  });
});
