import { Controller, Get, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { GetApartmentRequest, ApartmentDto } from '@boplats-map/api-schema';
import { ApiResponse } from '@nestjs/swagger';
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all apartments',
    type: ApartmentDto,
    isArray: true,
  })
  async getApartments(
    @Query() request: GetApartmentRequest
  ): Promise<ApartmentDto[]> {
    return this.apartmentService.getApartments(request);
  }
}
