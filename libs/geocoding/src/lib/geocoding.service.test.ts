// deno-lint-ignore-file no-explicit-any -- stubbing

import { expect } from "@std/expect";
import type { GeocodingFeature } from "./repository/geocoding.schema.ts";
import type {
  NominatimConfiguration,
} from "./config/nominatim.configuration.ts";
import { GeocodingService } from "./geocoding.service.ts";
import type { KeyHasher } from "./key-hasher.ts";
import { stub } from "@std/testing/mock";
import type { GeocodingClient } from "./nominatim/geocoding.client.ts";
import type {
  GeocodingFeatureResponse,
  GeocodingResponse,
} from "./nominatim/response.ts";
import type { GeocodingRepository } from "./repository/geocoding.repository.ts";
import type { StructuredQuery } from "./nominatim/request.ts";
import { describe, it } from "@std/testing/bdd";

Deno.test("GeocodingService", () => {
  describe("fetchAndSaveGeocodingData", () => {
    it(
      "should fetch and save geocoding data successfully when no existing match is found",
      async () => {
        const query: Partial<StructuredQuery> = { city: "New York" };
        const queryId = "hashedQueryId";
        const geocodingFeature: Partial<GeocodingFeature> = {
          queryId: queryId,
          type: "Feature",
          properties: {
            place_id: 123,
            osm_type: "node",
            osm_id: 456,
            place_rank: 10,
            category: "city",
            type: "city",
            importance: 0.9,
            addresstype: "city",
            name: "New York",
            display_name: "New York, USA",
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const response: GeocodingResponse = {
          type: "Mock type",
          licence: "Mock license",
          features: [geocodingFeature as GeocodingFeatureResponse],
        };
        const config = {} as NominatimConfiguration;
        const geocodingClient = {} as GeocodingClient;
        const geocodingRepository = {} as GeocodingRepository;
        const keyHasher = {} as KeyHasher;
        const geocodingService = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const geocodeStub = stub(
          geocodingClient,
          "geocode",
          () => Promise.resolve(response),
        );
        const hashStub = stub(keyHasher, "hashQuery", () => queryId);
        const findByIdStub = stub(
          geocodingRepository,
          "findById",
          () =>
            ({
              exec: () => Promise.resolve(geocodingFeature),
            }) as any,
        );
        const createStub = stub(
          geocodingRepository,
          "create",
          () => Promise.resolve(geocodingFeature) as any,
        );

        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        expect(geocodeStub).toHaveBeenCalledWith(query);
        expect(hashStub).toHaveBeenCalledWith(query);
        expect(findByIdStub).toHaveBeenCalledWith(queryId);
        expect(createStub).toHaveBeenCalledWith(geocodingFeature);
        expect(result).toEqual(geocodingFeature);
      },
    );

    it(
      "should return existing match when found in the repository",
      async () => {
        const query: Partial<StructuredQuery> = { city: "New York" };
        const queryId = "hashedQueryId";
        const geocodingFeature: Partial<GeocodingFeature> = {
          queryId: queryId,
          type: "Feature",
          properties: {
            place_id: 123,
            osm_type: "node",
            osm_id: 456,
            place_rank: 10,
            category: "city",
            type: "city",
            importance: 0.9,
            addresstype: "city",
            name: "New York",
            display_name: "New York, USA",
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const config = {} as NominatimConfiguration;
        const geocodingClient = {} as GeocodingClient;
        const geocodingRepository = {} as GeocodingRepository;
        const keyHasher = {} as KeyHasher;
        const geocodingService = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const hashStub = stub(keyHasher, "hashQuery", () => queryId);
        const findByIdStub = stub(
          geocodingRepository,
          "findById",
          ({
            exec: () => Promise.resolve(geocodingFeature),
          }) as any,
        );
        const geoCodeStub = stub(
          geocodingClient,
          "geocode",
          () => Promise.resolve({} as GeocodingResponse),
        );

        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        expect(hashStub).toHaveBeenCalledWith(query);
        expect(findByIdStub).toHaveBeenCalledWith(queryId);
        expect(geoCodeStub).not.toHaveBeenCalled();
        expect(result).toEqual(geocodingFeature);
      },
    );

    it(
      "should fetch and save geocoding data successfully when no existing match is found",
      async () => {
        const query = "New York";
        const queryId = "hashedQueryId";
        const geocodingFeature: Partial<GeocodingFeature> = {
          queryId: queryId,
          type: "Feature",
          properties: {
            place_id: 123,
            osm_type: "node",
            osm_id: 456,
            place_rank: 10,
            category: "city",
            type: "city",
            importance: 0.9,
            addresstype: "city",
            name: "New York",
            display_name: "New York, USA",
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const response: GeocodingResponse = {
          type: "Mock type",
          licence: "Mock license",
          features: [geocodingFeature as GeocodingFeatureResponse],
        };
        const config = {} as NominatimConfiguration;
        const geocodingClient = {} as GeocodingClient;
        const geocodingRepository = {} as GeocodingRepository;
        const keyHasher = {} as KeyHasher;
        const geocodingService = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const hashQueryStub = stub(keyHasher, "hashQuery", () => queryId);
        const geocodeStub = stub(
          geocodingClient,
          "geocode",
          () => Promise.resolve(response),
        );
        const findByIdStub = stub(
          geocodingRepository,
          "findById",
          () => Promise.resolve(null),
        );
        const createStub = stub(
          geocodingRepository,
          "create",
          () => Promise.resolve(geocodingFeature) as any,
        );

        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        expect(hashQueryStub).toHaveBeenCalledWith(query);
        expect(geocodeStub).toHaveBeenCalledWith(query);
        expect(findByIdStub).toHaveBeenCalledWith(queryId);
        expect(createStub).toHaveBeenCalledWith(geocodingFeature);
        expect(result).toEqual(geocodingFeature);
      },
    );

    it(
      "should return existing match without fetching when existing match is found",
      async () => {
        const query = "New York";
        const queryId = "hashedQueryId";
        const geocodingFeature: Partial<GeocodingFeature> = {
          queryId: queryId,
          type: "Feature",
          properties: {
            place_id: 123,
            osm_type: "node",
            osm_id: 456,
            place_rank: 10,
            category: "city",
            type: "city",
            importance: 0.9,
            addresstype: "city",
            name: "New York",
            display_name: "New York, USA",
          },
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const config = {} as NominatimConfiguration;
        const geocodingClient = {} as GeocodingClient;
        const geocodingRepository = {} as GeocodingRepository;
        const keyHasher = {} as KeyHasher;
        const geocodingService = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        const hashQueryStub = stub(keyHasher, "hashQuery", () => queryId);
        const findByIdStub = stub(
          geocodingRepository,
          "findById",
          () =>
            ({
              exec: () => Promise.resolve(geocodingFeature),
            }) as any,
        );
        const geoCodeStub = stub(
          geocodingClient,
          "geocode",
          () => Promise.resolve({} as GeocodingResponse),
        );

        const result = await geocodingService.fetchAndSaveGeocodingData(query);

        expect(hashQueryStub).toHaveBeenCalledWith(query);
        expect(findByIdStub).toHaveBeenCalledWith(queryId);
        expect(geoCodeStub).not.toHaveBeenCalled();
        expect(result).toEqual(geocodingFeature);
      },
    );

    it(
      "should throw an error when an error occurs during fetching and saving geocoding data",
      async () => {
        const query = "New York";
        const errorMessage = "Failed to fetch geocoding data";
        const config = {} as NominatimConfiguration;
        const geocodingClient = {} as GeocodingClient;
        const geocodingRepository = {} as GeocodingRepository;
        const keyHasher = {} as KeyHasher;
        const geocodingService = new GeocodingService(
          geocodingClient,
          geocodingRepository,
          config,
          keyHasher,
        );

        stub(keyHasher, "hashQuery", () => "hashQueryId");
        stub(
          geocodingClient,
          "geocode",
          () => Promise.reject(new Error(errorMessage)),
        );
        stub(
          geocodingRepository,
          "findById",
          () => Promise.resolve(null),
        );

        await expect(
          geocodingService.fetchAndSaveGeocodingData(query),
        ).rejects.toThrow(errorMessage);
      },
    );
  });
});
