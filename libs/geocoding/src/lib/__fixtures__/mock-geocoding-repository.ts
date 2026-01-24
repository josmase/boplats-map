import type { GeocodingRepository } from "../repository/geocoding.repository.ts";
import { createMock } from "@boplats/testing";

export class MockGeocodingRepository implements GeocodingRepository {
  async create(feature: any) {
    return feature;
  }

  async findById(id: string) {
    return null;
  }
}

export class FailingGeocodingRepository implements GeocodingRepository {
  async create(feature: any) {
    throw new Error("Create error");
  }

  async findById(id: string) {
    throw new Error("Find error");
  }
}

export const createMockGeocodingRepository = (): GeocodingRepository => {
  return createMock<GeocodingRepository>(new MockGeocodingRepository());
};

export const createFailingGeocodingRepository = (): GeocodingRepository => {
  return createMock<GeocodingRepository>(new FailingGeocodingRepository());
};
