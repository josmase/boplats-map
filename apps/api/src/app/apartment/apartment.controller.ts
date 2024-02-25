import { Controller, Get, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { GetApartmentRequest } from './requests/get-apartment.request';
import { ApartmentDto } from './responses/apartment-dto';
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
