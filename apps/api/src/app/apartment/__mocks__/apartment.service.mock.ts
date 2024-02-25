import { GetApartmentRequest } from '../requests/get-apartment.request';
import { jest } from '@jest/globals';

export class ApartmentServiceMock {
  getApartments = jest.fn(async (request: GetApartmentRequest) => {
    return [];
  });
}
