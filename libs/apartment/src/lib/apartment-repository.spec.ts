import { ApartmentRepository } from './apartment-repository';
import { ApartmentModel } from './apartment-model';

jest.mock('./apartment-model');

describe('ApartmentRepository', () => {
  let apartmentRepository = new ApartmentRepository(ApartmentModel);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('upsertApartment', () => {
    it('should upsert an apartment successfully', async () => {
      (ApartmentModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      });

      const apartmentData = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      const result = await apartmentRepository.upsertApartment(apartmentData);

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
      (ApartmentModel.findOneAndUpdate as jest.Mock).mockRejectedValueOnce(
        new Error('Mocked upsert error')
      );

      const apartmentData = {
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      await expect(
        apartmentRepository.upsertApartment(apartmentData)
      ).rejects.toThrow('Error upserting apartment: Mocked upsert error');
      expect(ApartmentModel.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteApartment', () => {
    it('should delete an apartment successfully', async () => {
      const mockApartment = {
        _id: 'Mock id',
        link: 'https://example.com/apartment123',
        areaName: 'Mock Area',
      };

      (ApartmentModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce(
        mockApartment
      );

      const result = await apartmentRepository.deleteApartment(
        mockApartment._id
      );

      expect(result).toEqual(mockApartment);
      expect(ApartmentModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: mockApartment._id,
      });
    });

    it('should handle errors during deletion', async () => {
      const mockError = new Error('Mocked delete error');
      (ApartmentModel.findOneAndDelete as jest.Mock).mockRejectedValueOnce(
        mockError
      );

      const apartmentToDelete = 'Mock id';

      await expect(
        apartmentRepository.deleteApartment(apartmentToDelete)
      ).rejects.toThrowError(`Error deleting apartment: ${mockError.message}`);
      expect(ApartmentModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: apartmentToDelete,
      });
    });
  });
});
