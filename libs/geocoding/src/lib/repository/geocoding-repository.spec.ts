import { GeocodingFeature, GeocodingResponse } from '../nominatim/response';
import { GeocodingFeatureModel } from './geocoding-model';
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
      };

      (GeocodingFeatureModel.create as jest.Mock).mockResolvedValue(feature);

      await geocodingRepository.create(queryId, feature);

      expect(GeocodingFeatureModel.create).toHaveBeenCalledWith({
        _id: queryId,
        ...feature,
      });
    });

    it('should return the created feature', async () => {
      const queryId = 'testQueryId';
      const feature: GeocodingFeature = {
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
      };

      (GeocodingFeatureModel.create as jest.Mock).mockResolvedValue(feature);

      const result = await geocodingRepository.create(queryId, feature);

      expect(result).toEqual(feature);
    });
  });

  describe('findById', () => {
    it('should call model.findOne with correct _id', async () => {
      const _id = 'testId';

      (GeocodingFeatureModel.findOne as jest.Mock).mockResolvedValue(null);

      await geocodingRepository.findById(_id);

      expect(GeocodingFeatureModel.findOne).toHaveBeenCalledWith({ _id });
    });

    it('should return the found feature', async () => {
      const _id = 'testId';
      const feature: GeocodingFeature = {
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
      };

      (GeocodingFeatureModel.findOne as jest.Mock).mockResolvedValue(feature);

      const result = await geocodingRepository.findById(_id);

      expect(result).toEqual(feature);
    });
  });
});
