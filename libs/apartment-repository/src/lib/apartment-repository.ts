import type { FilterQuery, Model } from "mongoose";
import type { Apartment } from "./apartment.ts";

export class ApartmentRepository {
  constructor(
    private readonly model: Model<Apartment>,
  ) {}

  async findById(_id: string): Promise<Apartment | null> {
    try {
      console.info(`Fetching apartment by ID: ${_id}`);
      const result = await this.model.findById(_id);
      if (!result) {
        console.warn(`Apartment with ID ${_id} not found`);
        return null;
      }
      return result;
    } catch (error) {
      throw new Error(`Error fetching apartment by ID: ${error}`);
    }
  }

  async upsertApartment(
    apartmentData: Partial<Apartment>,
  ): Promise<Apartment | null> {
    try {
      console.info(`Upserting apartment: ${apartmentData.link}`);
      const result = await this.model.findOneAndUpdate(
        { link: apartmentData.link },
        apartmentData,
        { upsert: true, new: true },
      );
      console.info(`Upserted apartment: ${apartmentData.link}`);

      return result;
    } catch (error) {
      throw new Error(`Error upserting apartment: ${error}`);
    }
  }

  async deleteApartment(_id: string): Promise<Apartment | null> {
    try {
      console.info(`Deleting apartment: ${_id}`);
      const result = await this.model.findOneAndDelete({ _id });
      return result;
    } catch (error) {
      throw new Error(`Error deleting apartment: ${error}`);
    }
  }

  async searchApartments(query: FilterQuery<Apartment>): Promise<Apartment[]> {
    try {
      console.log(`Querying apartments: ${JSON.stringify(query)}`);
      const results = await this.model.find(query);
      return results;
    } catch (error) {
      throw new Error(`Error searching apartments: ${error}`);
    }
  }
}
