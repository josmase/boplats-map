import type { Apartment, ApartmentRepository } from "@boplats/apartment-repository";
import { FilterQuery } from "mongoose";
import { createMock } from "@boplats/testing";

export class MockApartmentRepository implements ApartmentRepository {
  async searchApartments(query: FilterQuery<Apartment>) {
    return [];
  }

  async upsertApartment(apartment: Partial<Apartment>) {
    return apartment as Apartment;
  }

  async deleteApartment(id: string) {
    return { _id: id } as Apartment;
  }
}

export class FailingApartmentRepository implements ApartmentRepository {
  async searchApartments() {
    throw new Error("Search error");
  }

  async upsertApartment() {
    throw new Error("Upsert error");
  }

  async deleteApartment() {
    throw new Error("Delete error");
  }
}

export const createMockApartmentRepository = (): ApartmentRepository => {
  return createMock<ApartmentRepository>(new MockApartmentRepository());
};

export const createFailingApartmentRepository = (): ApartmentRepository => {
  return createMock<ApartmentRepository>(new FailingApartmentRepository());
};
