import { Apartment } from './../aparment';
import { FilterQuery } from 'mongoose';

export class ApartmentRepository {
  async upsertApartment(
    apartmentData: Partial<Apartment>
  ): Promise<Apartment | null> {
    return Promise.resolve({ ...apartmentData } as Apartment);
  }

  async deleteApartment(_id: string): Promise<Apartment | null> {
    return Promise.resolve({ _id } as unknown as Apartment);
  }

  async searchApartments(query: FilterQuery<Apartment>): Promise<Apartment[]> {
    return Promise.resolve([]);
  }
}
