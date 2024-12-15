import type { FilterQuery, Model } from "mongoose";
import type { Apartment } from "./apartment.ts";

export class ApartmentRepository {
  constructor(
    private readonly model: Model<Apartment>,
  ) {}

  async upsertApartment(
    apartmentData: Partial<Apartment>,
  ): Promise<Apartment | null> {
    try {
      const result = await this.model.findOneAndUpdate(
        { link: apartmentData.link },
        apartmentData,
        { upsert: true, new: true },
      );

      return result;
    } catch (error) {
      throw new Error(`Error upserting apartment: ${error}`);
    }
  }

  async deleteApartment(_id: string): Promise<Apartment | null> {
    try {
      const result = await this.model.findOneAndDelete({ _id });
      return result;
    } catch (error) {
      throw new Error(`Error deleting apartment: ${error}`);
    }
  }

  async searchApartments(query: FilterQuery<Apartment>): Promise<Apartment[]> {
    try {
      console.log(`Running query: ${JSON.stringify(query)}`);
      const results = await this.model.find(query);
      return results;
    } catch (error) {
      throw new Error(`Error searching apartments: ${error}`);
    }
  }
}
