import { ApiProperty } from '@nestjs/swagger';

export class PropertiesDto {
  @ApiProperty()
  place_id: number;

  @ApiProperty()
  osm_type: string;

  @ApiProperty()
  osm_id: number;

  @ApiProperty()
  place_rank: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  importance: number;

  @ApiProperty()
  addresstype: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  display_name: string;
}

export class GeometryDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: [number, number];
}

export class GeocodingFeatureDto {
  @ApiProperty()
  queryId: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ type: PropertiesDto })
  properties: PropertiesDto;

  @ApiProperty()
  bbox: [number, number, number, number];

  @ApiProperty({ type: GeometryDto })
  geometry: GeometryDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PriceDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;
}

export class SizeDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  unit: string;
}

export class FloorDto {
  @ApiProperty()
  actual: number;

  @ApiProperty({ required: false })
  total?: number;
}

export class ApartmentDto {
  @ApiProperty()
  link: string;

  @ApiProperty({ type: [String] })
  imageUrls: string[];

  @ApiProperty()
  areaName: string;

  @ApiProperty({ type: PriceDto })
  price: PriceDto;

  @ApiProperty()
  address: string;

  @ApiProperty({ type: SizeDto })
  size: SizeDto;

  @ApiProperty({ type: FloorDto })
  floor: FloorDto;

  @ApiProperty({ required: false })
  roomCount?: number;

  @ApiProperty({ required: false })
  publishedAt?: Date;

  @ApiProperty({ type: GeocodingFeatureDto })
  location: GeocodingFeatureDto;
}
