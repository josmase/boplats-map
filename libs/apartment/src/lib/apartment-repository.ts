import { FilterQuery, Model } from 'mongoose';
import { Apartment } from './aparment';
import { ApartmentModel } from './apartment-model';

class ApartmentRepository {
  private readonly model: Model<ApartmentModel>;

  constructor(model: Model<ApartmentModel>) {
    this.model = model;
  }

  async upsertApartment(
    apartmentData: Partial<Apartment | ApartmentModel>
  ): Promise<Apartment | ApartmentModel | null> {
    try {
      const result = await this.model.findOneAndUpdate(
        { link: apartmentData.link },
        apartmentData,
        { upsert: true, new: true }
      );

      return result;
    } catch (error) {
      throw new Error(`Error upserting apartment: ${error.message}`);
    }
  }

  async deleteApartment(
    _id: string
  ): Promise<Apartment | ApartmentModel | null> {
    try {
      const result = await this.model.findOneAndDelete({ _id });
      return result;
    } catch (error) {
      throw new Error(`Error deleting apartment: ${error.message}`);
    }
  }

  async searchApartments(
    query: FilterQuery<Apartment>
  ): Promise<Apartment[] | ApartmentModel[]> {
    try {
      const results = await this.model.find(query);
      return results;
    } catch (error) {
      throw new Error(`Error searching apartments: ${error.message}`);
    }
  }
}

export { ApartmentRepository };
