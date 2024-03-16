import { ApiProperty } from '@nestjs/swagger';

export class GetApartmentRequest {
  @ApiProperty({ required: false })
  dateStart?: Date;

  @ApiProperty({ required: false })
  dateEnd?: Date;

  @ApiProperty({ required: false })
  roomsMin?: number;

  @ApiProperty({ required: false })
  roomsMax?: number;

  @ApiProperty({ required: false })
  rentMin?: number;

  @ApiProperty({ required: false })
  rentMax?: number;

  @ApiProperty({ required: false })
  sizeMin?: number;

  @ApiProperty({ required: false })
  sizeMax?: number;
}
