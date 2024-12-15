// deno-lint-ignore-file no-explicit-any -- stubbing

import type { Model } from "mongoose";
import { ApartmentRepository } from "./apartment-repository.ts";
import type { Apartment } from "./apartment.ts";
import { expect } from "@std/expect";
import { stub } from "@std/testing/mock";
import { describe, it } from "@std/testing/bdd";

Deno.test("ApartmentRepository", () => {
  describe("upsertApartment", () => {
    it("should upsert an apartment successfully", async () => {
      const model = {} as Model<Apartment>;
      const apartmentRepository = new ApartmentRepository(model);
      const apartmentData = {
        link: "https://example.com/apartment123",
        areaName: "Mock Area",
      };
      const expectedResult = {
        link: "https://example.com/apartment123",
        areaName: "Mock Area",
      };

      const findOneAndUpdateStub = stub(
        model,
        "findOneAndUpdate",
        () => Promise.resolve(expectedResult) as any,
      );

      const result = await apartmentRepository.upsertApartment(apartmentData);

      expect(result).toEqual(expectedResult);
      expect(findOneAndUpdateStub).toBeCalledWith(
        { link: "https://example.com/apartment123" },
        apartmentData,
        { upsert: true, new: true },
      );
    });

    it("should handle errors during upsert", async () => {
      const model = {} as Model<Apartment>;
      const apartmentRepository = new ApartmentRepository(model);
      const apartmentData = {
        link: "https://example.com/apartment123",
        areaName: "Mock Area",
      };

      stub(
        model,
        "findOneAndUpdate",
        () => Promise.reject(new Error("Mocked upsert error")) as any,
      );

      await expect(
        apartmentRepository.upsertApartment(apartmentData),
      ).rejects.toThrow(
        "Error upserting apartment: Mocked upsert error",
      );
    });
  });

  describe("deleteApartment", () => {
    it("should delete an apartment successfully", async () => {
      const model = {} as Model<Apartment>;
      const apartmentRepository = new ApartmentRepository(model);
      const mockApartment = {
        _id: "Mock id",
        link: "https://example.com/apartment123",
        areaName: "Mock Area",
      };

      const findOneAndDeleteStub = stub(
        model,
        "findOneAndDelete",
        () => Promise.resolve(mockApartment) as any,
      );

      const result = await apartmentRepository.deleteApartment(
        mockApartment._id,
      );

      expect(result).toEqual(mockApartment);
      expect(findOneAndDeleteStub).toBeCalledWith(
        { _id: mockApartment._id },
      );
    });

    it("should handle errors during deletion", async () => {
      const model = {} as Model<Apartment>;
      const apartmentRepository = new ApartmentRepository(model);
      const apartmentToDelete = "Mock id";

      const mockError = new Error("Mocked delete error");
      stub(
        model,
        "findOneAndDelete",
        () => Promise.reject(mockError) as any,
      );

      await expect(apartmentRepository.deleteApartment(apartmentToDelete))
        .rejects
        .toThrow(
          `Error deleting apartment: ${mockError.message}`,
        );
    });
  });
});
