import { ApartmentService } from "./apartment.service.ts";
import type { GetApartmentRequest } from "./requests/get-apartment.request.ts";
import { expect, describe, it } from "bun:test";
import { createMockApartmentRepository, createFailingApartmentRepository } from "./__fixtures__/mock-apartment-repository.ts";
import { createMockApartmentQueryHelper } from "./__fixtures__/mock-apartment-query-helper.ts";

describe("ApartmentService", () => {
  describe("getApartments", () => {
    it(
      "should return apartments from repository",
      async () => {
        const apartmentRepository = createMockApartmentRepository();
        const apartmentQueryHelper = createMockApartmentQueryHelper();
        const apartmentService = new ApartmentService(
          apartmentRepository,
          apartmentQueryHelper,
        );
        const request = {} as GetApartmentRequest;
        const result = await apartmentService.getApartments(request);
        expect(Array.isArray(result)).toBe(true);
      },
    );

    it(
      "should throw an error if searchApartments throws an error",
      async () => {
        const apartmentRepository = createFailingApartmentRepository();
        const apartmentQueryHelper = createMockApartmentQueryHelper();
        const apartmentService = new ApartmentService(
          apartmentRepository,
          apartmentQueryHelper,
        );
        const request = {} as GetApartmentRequest;

        try {
          await apartmentService.getApartments(request);
          expect(false).toBe(true);
        } catch (error) {
          expect(String(error)).toContain("Error fetching apartments");
        }
      },
    );
  });
});
