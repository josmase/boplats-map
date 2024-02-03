import { parseISO } from 'date-fns';
import {
  parseFloor,
  parsePrice,
  parsePublicationDate,
  parseSize,
} from './apartment-parser-helpers';

describe('apartment parser helper', () => {
  describe('parsePrice', () => {
    test('should parse a valid price string', () => {
      const validPriceString = '10 000 kr';
      const result = parsePrice(validPriceString);
      expect(result).toEqual({ amount: 10000, currency: 'kr' });
    });

    test('should handle different currencies', () => {
      const euroPriceString = '7 500 Euro';
      const resultEuro = parsePrice(euroPriceString);
      expect(resultEuro).toEqual({ amount: 7500, currency: 'Euro' });
    });

    test('should handle invalid price strings and return null', () => {
      const invalidPriceString = 'invalid price';
      const result = parsePrice(invalidPriceString);
      expect(result).toBeNull();
    });

    test('should handle missing whitespace in the amount and return null', () => {
      const missingWhitespacePriceString = '1000USD';
      const result = parsePrice(missingWhitespacePriceString);
      expect(result).toBeNull();
    });
    test('should log a warning for an invalid date string', () => {
      const warnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementationOnce(() => {});
      const invalidPriceString = 'invalid price';
      parsePrice(invalidPriceString);
      expect(warnSpy).toHaveBeenCalledWith(
        'Unable to parse price:',
        invalidPriceString
      );
      warnSpy.mockRestore();
    });
  });
  describe('parseSize', () => {
    test('should parse a valid size string', () => {
      const validSizeString = '48.0 m²';
      const result = parseSize(validSizeString);
      expect(result).toEqual({ amount: 48.0, unit: 'm²' });
    });

    test('should handle different unit formats', () => {
      const sqFtSizeString = '500 sq ft';
      const resultSqFt = parseSize(sqFtSizeString);
      expect(resultSqFt).toEqual({ amount: 500, unit: 'sq ft' });

      const squareMetersSizeString = '75 square meters';
      const resultSquareMeters = parseSize(squareMetersSizeString);
      expect(resultSquareMeters).toEqual({ amount: 75, unit: 'square meters' });
    });

    test('should handle invalid size strings and return null', () => {
      const invalidSizeString = 'invalid size';
      const result = parseSize(invalidSizeString);
      expect(result).toBeNull();
    });

    test('should handle missing whitespace between amount and unit and return null', () => {
      const missingWhitespaceSizeString = '100sqft';
      const result = parseSize(missingWhitespaceSizeString);
      expect(result).toBeNull();
    });

    test('should log a warning for an invalid date string', () => {
      const warnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementationOnce(() => {});
      const invalidSizeString = 'invalid size';
      parseSize(invalidSizeString);
      expect(warnSpy).toHaveBeenCalledWith(
        'Unable to parse size:',
        invalidSizeString
      );
      warnSpy.mockRestore();
    });
  });
  describe('parsePublicationDate', () => {
    test('should return today when "idag" is provided', () => {
      const today = new Date();
      const result = parsePublicationDate('idag', today);
      expect(result).toEqual(today);
    });

    test('should return yesterday when "igår" is provided', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const result = parsePublicationDate('igår', today);
      expect(result).toEqual(yesterday);
    });

    test('should return day before yesterday when "i förrgår" is provided', () => {
      const today = new Date();
      const dayBeforeYesterday = new Date(today);
      dayBeforeYesterday.setDate(today.getDate() - 2);
      const result = parsePublicationDate('i förrgår', today);
      expect(result).toEqual(dayBeforeYesterday);
    });

    test('should parse ISO date string using parseISO when a valid date string is provided', () => {
      const today = new Date();
      const isoDateString = '2023-01-01';
      const result = parsePublicationDate(isoDateString, today);
      expect(result).toEqual(parseISO(isoDateString));
    });

    test('should handle invalid date string and return null', () => {
      const today = new Date();
      const invalidDateString = 'invalid date';
      const result = parsePublicationDate(invalidDateString, today);
      expect(result).toBeNull();
    });
    test('should log a warning for an invalid date string', () => {
      const warnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementationOnce(() => {});
      const today = new Date();
      const invalidDateString = 'invalid date';
      parsePublicationDate(invalidDateString, today);
      expect(warnSpy).toHaveBeenCalledWith(
        'Unable to parse date:',
        invalidDateString
      );
      warnSpy.mockRestore();
    });
  });
  describe('parseFloor', () => {
    test('should parse a valid floor string with both actual and total floors', () => {
      const validFloorString = 'Trapport 4 av 7';
      const result = parseFloor(validFloorString);
      expect(result).toEqual({ actual: 4, total: 7 });
    });

    test('should parse a valid floor string with only actual floors', () => {
      const actualFloorString = 'Trappor 10';
      const result = parseFloor(actualFloorString);
      expect(result).toEqual({ actual: 10 });
    });

    test('should handle missing total floors and return actual floor', () => {
      const missingTotalFloorsString = 'Trappor 2 av';
      const result = parseFloor(missingTotalFloorsString);
      expect(result).toEqual({ actual: 2 });
    });

    test('should handle invalid floor strings and return null', () => {
      const invalidFloorString = 'invalid floor';
      const result = parseFloor(invalidFloorString);
      expect(result).toBeNull();
    });

    test('should log a warning for an invalid floor string', () => {
      const invalidFloorString = 'invalid floor';
      const warnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementationOnce(() => {});
      parseFloor(invalidFloorString);
      expect(warnSpy).toHaveBeenCalledWith(
        'Unable to parse floor:',
        invalidFloorString
      );
      warnSpy.mockRestore();
    });
  });
});
