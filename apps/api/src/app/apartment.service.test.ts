import { ApartmentService } from "./apartment.service.ts";
import type {
  Apartment,
  ApartmentRepository,
} from "@new-new-boplats/apartment-repository";
import type { ApartmentQueryHelper } from "./apartment-query.helper.ts";
import { stub } from "@std/testing/mock";
import { expect } from "@std/expect";
import type { GetApartmentRequest } from "./requests/get-apartment.request.ts";
import { FilterQuery } from "mongoose";
import { describe, it } from "@std/testing/bdd";

Deno.test("ApartmentService", () => {
  describe("getApartments", () => {
    it(
      "should call createQueryFromRequest and searchApartments with correct arguments",
      async () => {
        const apartmentRepository = {} as ApartmentRepository;
        const apartmentQueryHelper = {} as ApartmentQueryHelper;
        const request = {} as GetApartmentRequest;
        const query = {} as FilterQuery<Apartment>;
        const apartments = [] as Apartment[];

        const searchApartmentsStub = stub(
          apartmentRepository,
          "searchApartments",
          () => Promise.resolve(apartments),
        );

        const createQueryFromRequestStub = stub(
          apartmentQueryHelper,
          "createQueryFromRequest",
          () => query,
        );

        const apartmentService = new ApartmentService(
          apartmentRepository,
          apartmentQueryHelper,
        );

        const result = await apartmentService.getApartments(request);

        expect(createQueryFromRequestStub).toHaveBeenCalledWith(request);
        expect(searchApartmentsStub).toHaveBeenCalledWith(query);
        expect(result).toEqual(apartments);
      },
    );

    it(
      "should throw an error if searchApartments throws an error",
      async () => {
        const apartmentRepository = {} as ApartmentRepository;
        const apartmentQueryHelper = {} as ApartmentQueryHelper;
        const request = {} as GetApartmentRequest;
        const error = new Error("Search error");

        const searchApartmentsStub = stub(
          apartmentRepository,
          "searchApartments",
          () => Promise.reject(error),
        );

        const apartmentService = new ApartmentService(
          apartmentRepository,
          apartmentQueryHelper,
        );

        await expect(apartmentService.getApartments(request)).rejects.toThrow(
          `Error fetching apartments: ${error.message}`,
        );

        expect(searchApartmentsStub).toHaveBeenCalled();
      },
    );
  });
});
