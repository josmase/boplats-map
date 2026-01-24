import { expect, describe, it } from "bun:test";
import type {
  NominatimConfiguration,
} from "./config/nominatim.configuration.ts";
import { GeocodingService } from "./geocoding.service.ts";
import type { StructuredQuery } from "./nominatim/request.ts";
import { createMockGeocodingClient, createFailingGeocodingClient } from "./nominatim/__fixtures__/mock-geocoding-client.ts";
import { createMockKeyHasher } from "./__fixtures__/mock-key-hasher.ts";
import { createMockGeocodingRepository } from "./__fixtures__/mock-geocoding-repository.ts";

describe("GeocodingService", () => {
  describe("fetchAndSaveGeocodingData", () => {
    it(
      "should fetch geocoding data from client",
      async () => {
        const config = {} as NominatimConfiguration;
        const geocodingClient = createMockGeocodingClient();
        const geocodingRepository = createMockGeocodingRepository();
        const keyHasher = createMockKeyHasher();
        const service = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const result = await service.fetchAndSaveGeocodingData("London");
        expect(result).toBeDefined();
      },
    );

    it(
      "should hash the query",
      async () => {
        const config = {} as NominatimConfiguration;
        const geocodingClient = createMockGeocodingClient();
        const geocodingRepository = createMockGeocodingRepository();
        const keyHasher = createMockKeyHasher();
        const service = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const query = { city: "Berlin" } as StructuredQuery;
        const result = await service.fetchAndSaveGeocodingData(query);
        expect(result).toBeDefined();
      },
    );

    it(
      "should store result in repository",
      async () => {
        const config = {} as NominatimConfiguration;
        const geocodingClient = createMockGeocodingClient();
        const geocodingRepository = createMockGeocodingRepository();
        const keyHasher = createMockKeyHasher();
        const service = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const result = await service.fetchAndSaveGeocodingData("Paris");
        expect(result).toBeDefined();
      },
    );

    it(
      "should handle errors during geocoding",
      async () => {
        const config = {} as NominatimConfiguration;
        const geocodingClient = createFailingGeocodingClient();
        const geocodingRepository = createMockGeocodingRepository();
        const keyHasher = createMockKeyHasher();
        const service = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        try {
          await service.fetchAndSaveGeocodingData("BadQuery");
          expect(false).toBe(true);
        } catch (error) {
          expect(String(error)).toContain("API Error");
        }
      },
    );
  });
});
