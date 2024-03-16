import { Injectable } from '@nestjs/common';
import { ApartmentRepository } from '@boplats-map/apartment';
import { createQueryFromRequest } from './apartment-query.helper';
import { ApartmentDto, GetApartmentRequest } from '@boplats-map/api-schema';

@Injectable()
export class ApartmentService {
  constructor(private readonly apartmentRepository: ApartmentRepository) {}

  async getApartments(request: GetApartmentRequest) {
    try {
      const query = createQueryFromRequest(request);
      const apartments = (await this.apartmentRepository.searchApartments(
        query
      )) as ApartmentDto[];
      return apartments;
    } catch (error) {
      throw new Error(`Error fetching apartments: ${error.message}`);
    }
  }
}
