import { ApartmentRepository } from './apartment-repository';
import { Model } from 'mongoose';
import { Apartment } from './apartment.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

const mockModel = () => ({
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
  find: jest.fn(),
});

describe('ApartmentRepository', () => {
  let apartmentRepository: ApartmentRepository;
  let model: jest.Mocked<Model<Apartment>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ApartmentRepository,
        {
          provide: getModelToken(Apartment.name),
          useFactory: mockModel,
        },
      ],
    }).compile();

    apartmentRepository = module.get(ApartmentRepository);
    model = module.get<Model<Apartment>>(
      getModelToken(Apartment.name)
    ) as jest.Mocked<Model<Apartment>>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('upsertApartment', () => {
    it('should upsert an apartment successfully', async () => {
      const apartmentData = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      const expectedResult = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      model.findOneAndUpdate.mockResolvedValueOnce(expectedResult);

      const result = await apartmentRepository.upsertApartment(apartmentData);

      expect(result).toEqual(expectedResult);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { link: 'https://example.com/apartment123' },
        apartmentData,
        { upsert: true, new: true }
      );
    });

    it('should handle errors during upsert', async () => {
      const apartmentData = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      const mockError = new Error('Mocked upsert error');
      model.findOneAndUpdate.mockRejectedValueOnce(mockError);

      await expect(
        apartmentRepository.upsertApartment(apartmentData)
      ).rejects.toThrowError(`Error upserting apartment: ${mockError.message}`);
      expect(model.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteApartment', () => {
    it('should delete an apartment successfully', async () => {
      const mockApartment = {
        _id: 'Mock id',
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      model.findOneAndDelete.mockResolvedValueOnce(mockApartment);

      const result = await apartmentRepository.deleteApartment(
        mockApartment._id
      );

      expect(result).toEqual(mockApartment);
      expect(model.findOneAndDelete).toHaveBeenCalledWith({
        _id: mockApartment._id,
      });
    });

    it('should handle errors during deletion', async () => {
      const apartmentToDelete = 'Mock id';

      const mockError = new Error('Mocked delete error');
      model.findOneAndDelete.mockRejectedValueOnce(mockError);

      await expect(
        apartmentRepository.deleteApartment(apartmentToDelete)
      ).rejects.toThrowError(`Error deleting apartment: ${mockError.message}`);
      expect(model.findOneAndDelete).toHaveBeenCalledWith({
        _id: apartmentToDelete,
      });
    });
  });
});
