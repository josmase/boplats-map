import { parseISO } from "date-fns";
import {
  parseFloor,
  parsePrice,
  parsePublicationDate,
  parseSize,
} from "./apartment-parser-helpers.ts";
import { expect } from "@std/expect";
import { stub } from "@std/testing/mock";
import { describe, it } from "@std/testing/bdd";

Deno.test("ApartmentParserHelpers", () => {
  describe("parsePrice", () => {
    it("should parse a valid price string", () => {
      const validPriceString = "10 000 kr";
      const result = parsePrice(validPriceString);
      expect(result).toEqual({ amount: 10000, currency: "kr" });
    });

    it("should handle different currencies", () => {
      const euroPriceString = "7 500 Euro";
      const resultEuro = parsePrice(euroPriceString);
      expect(resultEuro).toEqual({ amount: 7500, currency: "Euro" });
    });

    it("should handle invalid price strings and return null", () => {
      const invalidPriceString = "invalid price";
      const result = parsePrice(invalidPriceString);
      expect(result).toBeUndefined();
    });

    it(
      "should handle missing whitespace in the amount and return null",
      () => {
        const missingWhitespacePriceString = "1000USD";
        const result = parsePrice(missingWhitespacePriceString);
        expect(result).toBeUndefined();
      },
    );

    it("should log a warning for an invalid price string", () => {
      const warnSpy = stub(console, "warn", () => {});
      const invalidPriceString = "invalid price";
      parsePrice(invalidPriceString);
      expect(warnSpy).toHaveBeenCalledWith(
        "Unable to parse price:",
        invalidPriceString,
      );
      warnSpy.restore();
    });
  });

  describe("parseSize", () => {
    it("should parse a valid size string", () => {
      const validSizeString = "48.0 m²";
      const result = parseSize(validSizeString);
      expect(result).toEqual({ amount: 48.0, unit: "m²" });
    });

    it("should handle different unit formats", () => {
      const sqFtSizeString = "500 sq ft";
      const resultSqFt = parseSize(sqFtSizeString);
      expect(resultSqFt).toEqual({ amount: 500, unit: "sq ft" });

      const squareMetersSizeString = "75 square meters";
      const resultSquareMeters = parseSize(squareMetersSizeString);
      expect(resultSquareMeters).toEqual({ amount: 75, unit: "square meters" });
    });

    it("should handle invalid size strings and return null", () => {
      const invalidSizeString = "invalid size";
      const result = parseSize(invalidSizeString);
      expect(result).toBeUndefined();
    });

    it(
      "should handle missing whitespace between amount and unit and return null",
      () => {
        const missingWhitespaceSizeString = "100sqft";
        const result = parseSize(missingWhitespaceSizeString);
        expect(result).toBeUndefined();
      },
    );

    it("should log a warning for an invalid size string", () => {
      const warnSpy = stub(console, "warn", () => {});
      const invalidSizeString = "invalid size";
      parseSize(invalidSizeString);
      expect(warnSpy).toHaveBeenCalledWith(
        "Unable to parse size:",
        invalidSizeString,
      );
      warnSpy.restore();
    });
  });

  describe("parsePublicationDate", () => {
    it('should return today when "idag" is provided', () => {
      const today = new Date();
      const result = parsePublicationDate("idag", today);
      expect(result).toEqual(today);
    });

    it('should return yesterday when "igår" is provided', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const result = parsePublicationDate("igår", today);
      expect(result).toEqual(yesterday);
    });

    it("should parse ISO date string", () => {
      const today = new Date();
      const isoDateString = "2023-01-01";
      const result = parsePublicationDate(isoDateString, today);
      expect(result).toEqual(parseISO(isoDateString));
    });

    it("should handle invalid date strings and return null", () => {
      const today = new Date();
      const invalidDateString = "invalid date";
      const result = parsePublicationDate(invalidDateString, today);
      expect(result).toBeUndefined();
    });

    it("should log a warning for an invalid date string", () => {
      const warnSpy = stub(console, "warn", () => {});
      const today = new Date();
      const invalidDateString = "invalid date";
      parsePublicationDate(invalidDateString, today);
      expect(warnSpy).toHaveBeenCalledWith(
        "Unable to parse date:",
        invalidDateString,
      );
      warnSpy.restore();
    });
  });

  describe("parseFloor", () => {
    it(
      "should parse a valid floor string with both actual and total floors",
      () => {
        const validFloorString = "Trapport 4 av 7";
        const result = parseFloor(validFloorString);
        expect(result).toEqual({ actual: 4, total: 7 });
      },
    );

    it(
      "should handle invalid floor strings and return undefined",
      () => {
        const invalidFloorString = "invalid floor";
        const result = parseFloor(invalidFloorString);
        expect(result).toBeUndefined();
      },
    );

    it("should log a warning for an invalid floor string", () => {
      const invalidFloorString = "invalid floor";
      const warnSpy = stub(console, "warn", () => {});
      parseFloor(invalidFloorString);
      expect(warnSpy).toHaveBeenCalledWith(
        "Unable to parse floor:",
        invalidFloorString,
      );
      warnSpy.restore();
    });
  });
});
