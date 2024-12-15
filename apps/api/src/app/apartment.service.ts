import type { ApartmentQueryHelper } from "./apartment-query.helper.ts";
import type { GetApartmentRequest } from "./requests/get-apartment.request.ts";
import type { ApartmentDto } from "./responses/apartment-dto.ts";
import type { ApartmentRepository } from "@new-new-boplats/apartment-repository";

export class ApartmentService {
  constructor(
    private readonly apartmentRepository: ApartmentRepository,
    private readonly apartmentQueryHelper: ApartmentQueryHelper,
  ) {}

  async getApartments(request: GetApartmentRequest) {
    try {
      const query = this.apartmentQueryHelper.createQueryFromRequest(request);
      const apartments = (await this.apartmentRepository.searchApartments(
        query,
      )) as ApartmentDto[];
      return apartments;
    } catch (error) {
      throw new Error(`Error fetching apartments: ${error}`);
    }
  }
}
