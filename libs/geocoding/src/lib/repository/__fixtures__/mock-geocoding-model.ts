import type { GeocodingFeature } from "../geocoding.schema.ts";
import { GeocodingRepository } from "../geocoding.repository.ts";
import type { Model } from "mongoose";
import { createMock } from "@boplats/testing";

export function createMockGeocodingModel(): any {
  return {
    create: (data: any) => Promise.resolve(data),
    findOne: (query: any) => ({
      exec: () => Promise.resolve(null),
    }),
  } as any as Model<GeocodingFeature>;
}

export function createMockGeocodingModelWithData(feature: any): any {
  return {
    create: (data: any) => Promise.resolve(data),
    findOne: (query: any) => ({
      exec: () => Promise.resolve(feature),
    }),
  } as any as Model<GeocodingFeature>;
}

export class MockGeocodingRepository implements GeocodingRepository {
  async create(feature: any) {
    return feature;
  }

  async findById(id: string) {
    return null;
  }
}

export const createMockGeocodingRepository = (): GeocodingRepository => {
  return createMock<GeocodingRepository>(new MockGeocodingRepository());
};
