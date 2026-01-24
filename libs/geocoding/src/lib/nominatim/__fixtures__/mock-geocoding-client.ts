import type { GeocodingClient } from "../geocoding.client.ts";
import type { GeocodingResponse } from "../response.ts";
import { createMock } from "@boplats/testing";

export class MockGeocodingClient {
  async geocode(query: any): Promise<GeocodingResponse> {
    return { type: "FeatureCollection", licence: "test", features: [] };
  }
}

export class FailingGeocodingClient {
  async geocode(query: any): Promise<GeocodingResponse> {
    throw new Error("API Error");
  }
}

export const createMockGeocodingClient = (): GeocodingClient => {
  return createMock<GeocodingClient>(new MockGeocodingClient());
};

export const createFailingGeocodingClient = (): GeocodingClient => {
  return createMock<GeocodingClient>(new FailingGeocodingClient());
};
