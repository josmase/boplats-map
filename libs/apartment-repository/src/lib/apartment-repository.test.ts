import { ApartmentRepository } from "./apartment-repository.ts";
import { expect, describe, it } from "bun:test";
import { createMockApartmentModel, createFailingApartmentModel } from "./__fixtures__/mock-apartment-model.ts";

describe("ApartmentRepository", () => {
  describe("upsertApartment", () => {
    it("should call upsert method", async () => {
      const mockModel = createMockApartmentModel();
      const repository = new ApartmentRepository(mockModel);
      const result = await repository.upsertApartment({ link: "test" } as any);
      expect(result).toBeDefined();
    });

    it("should handle errors during upsert", async () => {
      const mockModel = createFailingApartmentModel("DB Error");
      const repository = new ApartmentRepository(mockModel);

      try {
        await repository.upsertApartment({ link: "test" } as any);
        expect(false).toBe(true);
      } catch (error) {
        expect(String(error)).toContain("DB Error");
      }
    });
  });

  describe("deleteApartment", () => {
    it("should call delete method", async () => {
      const mockModel = createMockApartmentModel();
      const repository = new ApartmentRepository(mockModel);
      const result = await repository.deleteApartment("123");
      expect(result).toBeDefined();
    });

    it("should handle errors during deletion", async () => {
      const mockModel = createFailingApartmentModel("Delete Error");
      const repository = new ApartmentRepository(mockModel);

      try {
        await repository.deleteApartment("123");
        expect(false).toBe(true);
      } catch (error) {
        expect(String(error)).toContain("Delete Error");
      }
    });
  });
});
