import { GetApartmentRequest } from '@boplats-map/api-schema';
import { jest } from '@jest/globals';

export class ApartmentServiceMock {
  getApartments = jest.fn(async (request: GetApartmentRequest) => {
    return [];
  });
}
