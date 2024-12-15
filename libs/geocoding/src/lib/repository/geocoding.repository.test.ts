// deno-lint-ignore-file no-explicit-any -- stubbing

import type { GeocodingFeature } from "./geocoding.schema.ts";
import { GeocodingRepository } from "./geocoding.repository.ts";
import type { Model } from "mongoose";
import { stub } from "@std/testing/mock";
import { expect } from "@std/expect/expect";
import { describe, it } from "@std/testing/bdd";

Deno.test("GeocodingRepository", () => {
  describe("create", () => {
    it("should call model.create with correct parameters", async () => {
      const feature: Partial<GeocodingFeature> = {
        queryId: "queryId",
        type: "Feature",
        properties: {
          place_id: 123,
          osm_type: "node",
          osm_id: 456,
          place_rank: 20,
          category: "boundary",
          type: "administrative",
          importance: 0.366,
          addresstype: "suburb",
          name: "TestName",
          display_name: "Test Display Name",
        },
        bbox: [1, 2, 3, 4],
        geometry: {
          type: "Point",
          coordinates: [5, 6],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const model = {} as Model<GeocodingFeature>;
      const createStub = stub(
        model,
        "create",
        () => Promise.resolve(null) as any,
      );
      const repository = new GeocodingRepository(model);

      await repository.create(feature);

      expect(createStub).toHaveBeenCalledWith(feature);
    });

    it("should return the created feature", async () => {
      const feature: Partial<GeocodingFeature> = {
        queryId: "queryId",
        type: "Feature",
        properties: {
          place_id: 123,
          osm_type: "node",
          osm_id: 456,
          place_rank: 20,
          category: "boundary",
          type: "administrative",
          importance: 0.366,
          addresstype: "suburb",
          name: "TestName",
          display_name: "Test Display Name",
        },
        bbox: [1, 2, 3, 4],
        geometry: {
          type: "Point",
          coordinates: [5, 6],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const model = {} as Model<GeocodingFeature>;
      stub(model, "create", () => Promise.resolve(feature) as any);
      const repository = new GeocodingRepository(model);

      const result = await repository.create(feature);

      expect(result).toEqual(feature);
    });
  });

  describe("findById", () => {
    it("should call model.findOne with correct _id", async () => {
      const model = {} as Model<GeocodingFeature>;
      const findOneStub = stub(model, "findOne", () =>
        ({
          exec: () => Promise.resolve(null),
        }) as any);
      const repository = new GeocodingRepository(model);

      await repository.findById("queryId");

      expect(findOneStub).toHaveBeenCalledWith({ queryId: "queryId" });
    });

    it("should return the found feature", async () => {
      const feature: Partial<GeocodingFeature> = {
        queryId: "queryId",
        type: "Feature",
        properties: {
          place_id: 123,
          osm_type: "node",
          osm_id: 456,
          place_rank: 20,
          category: "boundary",
          type: "administrative",
          importance: 0.366,
          addresstype: "suburb",
          name: "TestName",
          display_name: "Test Display Name",
        },
        bbox: [1, 2, 3, 4],
        geometry: {
          type: "Point",
          coordinates: [5, 6],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const model = {} as Model<GeocodingFeature>;
      stub(model, "findOne", () =>
        ({
          exec: () => Promise.resolve(feature),
        }) as any);
      const repository = new GeocodingRepository(model);

      const result = await repository.findById("queryId");

      expect(result).toEqual(feature);
    });
  });
});
