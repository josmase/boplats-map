import { expect } from "@std/expect";
import { ApartmentQueryHelper } from "./apartment-query.helper.ts";
import { describe, it } from "@std/testing/bdd";

Deno.test("ApartmentQueryHelper", (t) => {
  describe("createQueryFromRequest", () => {
    [{
      query: {
        dateStart: new Date("2022-01-01"),
        dateEnd: new Date("2022-12-31"),
      },
      expectedQuery: {
        updatedAt: {
          $gte: new Date("2022-01-01"),
          $lte: new Date("2022-12-31"),
        },
      },
    }, {
      query: { dateStart: new Date("2022-01-01") },
      expectedQuery: { updatedAt: { $gte: new Date("2022-01-01") } },
    }, {
      query: { dateEnd: new Date("2022-12-31") },
      expectedQuery: { updatedAt: { $lte: new Date("2022-12-31") } },
    }].forEach(({ query, expectedQuery }) => {
      it(
        `should create query with correct argument when date is ${
          JSON.stringify(query)
        }`,
        () => {
          const apartmentQueryHelper = new ApartmentQueryHelper();
          const result = apartmentQueryHelper.createQueryFromRequest(query);
          expect(result).toEqual(expectedQuery);
        },
      );
    });

    [{
      query: { roomsMin: 1, roomsMax: 3 },
      expectedQuery: { roomCount: { $gte: 1, $lte: 3 } },
    }, {
      query: { roomsMin: 1 },
      expectedQuery: { roomCount: { $gte: 1 } },
    }, {
      query: { roomsMax: 3 },
      expectedQuery: { roomCount: { $lte: 3 } },
    }].forEach(({ query, expectedQuery }) => {
      it(
        `should create query with correct argument when rooms is ${
          JSON.stringify(query)
        }`,
        () => {
          const apartmentQueryHelper = new ApartmentQueryHelper();
          const result = apartmentQueryHelper.createQueryFromRequest(query);
          expect(result).toEqual(expectedQuery);
        },
      );
    });

    [{
      query: { rentMin: 1000, rentMax: 2000 },
      expectedQuery: { "price.amount": { $gte: 1000, $lte: 2000 } },
    }, {
      query: { rentMin: 1000 },
      expectedQuery: { "price.amount": { $gte: 1000 } },
    }, {
      query: { rentMax: 2000 },
      expectedQuery: { "price.amount": { $lte: 2000 } },
    }].forEach(({ query, expectedQuery }) => {
      it(
        `should create query with correct argument when rent is ${
          JSON.stringify(query)
        }`,
        () => {
          const apartmentQueryHelper = new ApartmentQueryHelper();
          const result = apartmentQueryHelper.createQueryFromRequest(query);
          expect(result).toEqual(expectedQuery);
        },
      );
    });

    [{
      query: { sizeMin: 50, sizeMax: 100 },
      expectedQuery: { "size.amount": { $gte: 50, $lte: 100 } },
    }, {
      query: { sizeMin: 50 },
      expectedQuery: { "size.amount": { $gte: 50 } },
    }, {
      query: { sizeMax: 100 },
      expectedQuery: { "size.amount": { $lte: 100 } },
    }].forEach(({ query, expectedQuery }) => {
      it(
        `should create query with correct argument when size is ${
          JSON.stringify(query)
        }`,
        () => {
          const apartmentQueryHelper = new ApartmentQueryHelper();
          const result = apartmentQueryHelper.createQueryFromRequest(query);
          expect(result).toEqual(expectedQuery);
        },
      );
    });
  });
});
