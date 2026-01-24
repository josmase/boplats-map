import type { GetApartmentRequest } from "../requests/get-apartment.request.ts";
import type { ApartmentQueryHelper } from "../apartment-query.helper.ts";
import { FilterQuery } from "mongoose";
import type { Apartment } from "@boplats/apartment-repository";
import { createMock } from "@boplats/testing";

export class MockApartmentQueryHelper {
  createQueryFromRequest(request: GetApartmentRequest) {
    return {} as FilterQuery<Apartment>;
  }
}

export const createMockApartmentQueryHelper = (): ApartmentQueryHelper => {
  return createMock<ApartmentQueryHelper>(new MockApartmentQueryHelper());
};
