import { FilterQuery } from 'mongoose';
import { Location } from './location';
import { LocationModel } from './location-model';

async function upsertLocation(
  locationData: Partial<Location>
): Promise<Location | null> {
  try {
    const result = await LocationModel.findOneAndUpdate(
      { address: locationData.address },
      locationData,
      { upsert: true, new: true }
    );

    return result;
  } catch (error) {
    throw new Error(`Error upserting location: ${error.message}`);
  }
}

async function deleteLocation(_id: string): Promise<Location | null> {
  try {
    const result = await LocationModel.findOneAndDelete({ _id });
    return result;
  } catch (error) {
    throw new Error(`Error deleting location: ${error.message}`);
  }
}
async function searchLocations(
  query: FilterQuery<Location>
): Promise<Location[]> {
  try {
    const results = await LocationModel.find(query);
    return results;
  } catch (error) {
    throw new Error(`Error searching locations: ${error.message}`);
  }
}
export { upsertLocation, deleteLocation, searchLocations };
