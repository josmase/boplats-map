import { FilterQuery, Model } from 'mongoose';
import { Apartment } from './apartment.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ApartmentRepository {
  constructor(
    @InjectModel(Apartment.name)
    private readonly model: Model<Apartment>
  ) {}

  async upsertApartment(
    apartmentData: Partial<Apartment>
  ): Promise<Apartment | null> {
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

  async deleteApartment(_id: string): Promise<Apartment | null> {
    try {
      const result = await this.model.findOneAndDelete({ _id });
      return result;
    } catch (error) {
      throw new Error(`Error deleting apartment: ${error.message}`);
    }
  }

  async searchApartments(query: FilterQuery<Apartment>): Promise<Apartment[]> {
    try {
      Logger.log(`Running query: ${JSON.stringify(query)}`);
      const results = await this.model.find(query);
      return results;
    } catch (error) {
      throw new Error(`Error searching apartments: ${error.message}`);
    }
  }
}
