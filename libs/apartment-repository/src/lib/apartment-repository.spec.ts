import {
  deleteApartment,
  searchApartments,
  upsertApartment,
} from './apartment-repository';
import { ApartmentModel } from './apartment-model';

jest.mock('./apartment-model', () => ({
  ApartmentModel: {
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    find: jest.fn(),
  },
}));

describe('apartment repository', () => {
  describe('upsertApartment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should upsert an apartment successfully', async () => {
      (ApartmentModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      });

      const apartmentData = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      const result = await upsertApartment(apartmentData);

      expect(result).toEqual({
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      });
      expect(ApartmentModel.findOneAndUpdate).toHaveBeenCalledWith(
        { link: 'https://example.com/apartment123' },
        apartmentData,
        { upsert: true, new: true }
      );
    });

    it('should handle errors during upsert', async () => {
      (ApartmentModel.findOneAndUpdate as jest.Mock).mockImplementationOnce(
        () => {
          throw new Error('Mocked upsert error');
        }
      );

      const apartmentData = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      await expect(upsertApartment(apartmentData)).rejects.toThrow(
        'Error upserting apartment: Mocked upsert error'
      );
      expect(ApartmentModel.findOneAndUpdate).toHaveBeenCalled();
    });
  });
  describe('deleteApartment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should delete an apartment successfully', async () => {
      (ApartmentModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce({
        _id: 'Mock id',
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      });

      const apartmentToDelete = 'Mock id';
      const result = await deleteApartment(apartmentToDelete);

      expect(result).toEqual({
        _id: 'Mock id',
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      });
      expect(ApartmentModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: apartmentToDelete,
      });
    });

    it('should handle errors during deletion', async () => {
      (ApartmentModel.findOneAndDelete as jest.Mock).mockImplementationOnce(
        () => {
          throw new Error('Mocked delete error');
        }
      );

      const apartmentToDelete = 'Mock id';

      await expect(deleteApartment(apartmentToDelete)).rejects.toThrow(
        'Error deleting apartment: Mocked delete error'
      );
      expect(ApartmentModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: apartmentToDelete,
      });
    });
  });
  describe('searchApartments', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should search apartments successfully', async () => {
      const mockResults = [
        { link: 'https://example.com/apartment1', areaName: 'Mock Area 1' },
        { link: 'https://example.com/apartment2', areaName: 'Mock Area 2' },
      ];
      (ApartmentModel.find as jest.Mock).mockResolvedValueOnce(mockResults);

      const searchQuery = { areaName: 'Mock Area 1' };
      const results = await searchApartments(searchQuery);

      expect(results).toEqual(mockResults);
      expect(ApartmentModel.find).toHaveBeenCalledWith(searchQuery);
    });

    it('should handle errors during search', async () => {
      (ApartmentModel.find as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Mocked search error');
      });

      const searchQuery = { areaName: 'Mock Area 1' };

      await expect(searchApartments(searchQuery)).rejects.toThrowError(
        'Error searching apartments: Mocked search error'
      );
      expect(ApartmentModel.find).toHaveBeenCalledWith(searchQuery);
    });
  });
});
