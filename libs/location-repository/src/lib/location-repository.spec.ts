import {
  deleteLocation,
  searchLocations,
  upsertLocation,
} from './location-repository';
import { LocationModel } from './location-model';

jest.mock('./location-model', () => ({
  LocationModel: {
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    find: jest.fn(),
  },
}));

describe('location repository', () => {
  describe('upsertLocation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should upsert a location successfully', async () => {
      (LocationModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({
        address: 'Mock address',
        latitude: 'Mock latitude',
        longitude: 'Mock longitude',
      });

      const locationData = {
        address: 'Mock address',
        latitude: 'Mock new latitude',
      };

      const result = await upsertLocation(locationData);

      expect(result).toEqual({
        address: 'Mock address',
        latitude: 'Mock latitude',
        longitude: 'Mock longitude',
      });
      expect(LocationModel.findOneAndUpdate).toHaveBeenCalledWith(
        { address: 'Mock address' },
        locationData,
        { upsert: true, new: true }
      );
    });

    it('should hadle errors during upsert', async () => {
      (LocationModel.findOneAndUpdate as jest.Mock).mockImplementationOnce(
        () => {
          throw new Error('Mocked upsert error');
        }
      );

      const locationData = {
        address: 'Mock address',
        latitude: 'Mock latitude',
      };

      await expect(upsertLocation(locationData)).rejects.toThrow(
        'Error upserting location: Mocked upsert error'
      );
      expect(LocationModel.findOneAndUpdate).toHaveBeenCalled();
    });
  });
  describe('deleteLocation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should delete a location successfully', async () => {
      (LocationModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce({
        _id: 'Mock id',
      });

      const locationToDelete = 'Mock id';
      const result = await deleteLocation(locationToDelete);

      expect(result).toEqual({
        _id: 'Mock id',
      });
      expect(LocationModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: locationToDelete,
      });
    });

    it('should hadle errors during deletion', async () => {
      (LocationModel.findOneAndDelete as jest.Mock).mockImplementationOnce(
        () => {
          throw new Error('Mocked delete error');
        }
      );

      const locationToDelete = 'Mock id';

      await expect(deleteLocation(locationToDelete)).rejects.toThrow(
        'Error deleting location: Mocked delete error'
      );
      expect(LocationModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: locationToDelete,
      });
    });
  });
  describe('searchLocations', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should search locations successfully', async () => {
      const mockResults = [{ address: 'Mock address 1' }];
      (LocationModel.find as jest.Mock).mockResolvedValueOnce(mockResults);

      const searchQuery = { address: 'Mock address 1' };
      const results = await searchLocations(searchQuery);

      expect(results).toEqual(mockResults);
      expect(LocationModel.find).toHaveBeenCalledWith(searchQuery);
    });

    it('should hadle errors during search', async () => {
      (LocationModel.find as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Mocked search error');
      });

      const searchQuery = { address: 'Mock address 1' };

      await expect(searchLocations(searchQuery)).rejects.toThrowError(
        'Error searching locations: Mocked search error'
      );
      expect(LocationModel.find).toHaveBeenCalledWith(searchQuery);
    });
  });
});
