import { GeocodingRepository } from "./geocoding.repository.ts";
import { expect, describe, it } from "bun:test";
import { createMockGeocodingModel, createMockGeocodingModelWithData } from "./__fixtures__/mock-geocoding-model.ts";

describe("GeocodingRepository", () => {
  describe("create", () => {
    it("should call model.create with feature data", async () => {
      const mockModel = createMockGeocodingModel();
      const repository = new GeocodingRepository(mockModel);
      const feature = { queryId: "test", type: "Feature" } as any;
      const result = await repository.create(feature);
      expect(result).toBeDefined();
    });

    it("should return the created feature", async () => {
      const feature = { queryId: "test123", type: "Feature" };
      const mockModel = createMockGeocodingModel();
      const repository = new GeocodingRepository(mockModel);
      const result = await repository.create(feature as any);
      expect(result?.queryId).toBe("test123");
    });
  });

  describe("findById", () => {
    it("should call model.findOne with queryId", async () => {
      const mockModel = createMockGeocodingModel();
      const repository = new GeocodingRepository(mockModel);
      const result = await repository.findById("test-id");
      expect(result).toBeNull();
    });

    it("should return the found feature", async () => {
      const feature = { queryId: "test-id", type: "Feature" };
      const mockModel = createMockGeocodingModelWithData(feature);
      const repository = new GeocodingRepository(mockModel);
      const result = await repository.findById("test-id");
      expect(result?.queryId).toBe("test-id");
    });
  });
});
