import { GeocodingFeature } from './geocoding.schema';
import { GeocodingRepository } from './geocoding.repository';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

const mockModel = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('GeocodingRepository', () => {
  let repository: GeocodingRepository;
  let model: jest.Mocked<Model<GeocodingFeature>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GeocodingRepository,
        {
          provide: getModelToken(GeocodingFeature.name),
          useFactory: mockModel,
        },
      ],
    }).compile();

    repository = module.get<GeocodingRepository>(GeocodingRepository);
    model = module.get<Model<GeocodingFeature>>(
      getModelToken(GeocodingFeature.name)
    ) as jest.Mocked<Model<GeocodingFeature>>;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should call model.create with correct parameters', async () => {
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

      model.create.mockResolvedValue(null);

      await repository.create(feature);

      expect(model.create).toHaveBeenCalledWith(feature);
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

      model.create.mockResolvedValue(feature as any);

      const result = await repository.create(feature);

      expect(result).toEqual(feature);
    });
  });

  describe('findById', () => {
    it('should call model.findOne with correct _id', async () => {
      const queryId = 'testId';

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await repository.findById(queryId);

      expect(model.findOne).toHaveBeenCalledWith({ queryId });
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

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(feature),
      } as any);
      const result = await repository.findById(queryId);

      expect(result).toEqual(feature);
    });
  });
});
