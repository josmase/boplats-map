import { FilterQuery } from 'mongoose';
import { Apartment } from './aparment';
import { ApartmentModel } from './apartment-model';

async function upsertApartment(
  apartmentData: Partial<Apartment>
): Promise<Apartment | null> {
  try {
    const result = await ApartmentModel.findOneAndUpdate(
      { link: apartmentData.link },
      apartmentData,
      { upsert: true, new: true }
    );

    return result;
  } catch (error) {
    throw new Error(`Error upserting apartment: ${error.message}`);
  }
}

async function deleteApartment(_id: string): Promise<Apartment | null> {
  try {
    const result = await ApartmentModel.findOneAndDelete({ _id });
    return result;
  } catch (error) {
    throw new Error(`Error deleting apartment: ${error.message}`);
  }
}
async function searchApartments(
  query: FilterQuery<Apartment>
): Promise<Apartment[]> {
  try {
    const results = await ApartmentModel.find(query);
    return results;
  } catch (error) {
    throw new Error(`Error searching apartments: ${error.message}`);
  }
}
export { upsertApartment, deleteApartment, searchApartments };
