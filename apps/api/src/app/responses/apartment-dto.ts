export interface PropertiesDto {
  place_id: number;
  osm_type: string;
  osm_id: number;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
}

export interface GeometryDto {
  type: string;
  coordinates: [number, number];
}

export interface GeocodingFeatureDto {
  queryId: string;
  type: string;
  properties: PropertiesDto;
  bbox: [number, number, number, number];
  geometry: GeometryDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceDto {
  amount: number;
  currency: string;
}

export interface SizeDto {
  amount: number;
  unit: string;
}

export interface FloorDto {
  actual: number;
  total?: number;
}

export interface ApartmentDto {
  link: string;
  imageUrls: string[];
  areaName: string;
  price: PriceDto;
  address: string;
  size: SizeDto;
  floor: FloorDto;
  roomCount?: number;
  publishedAt?: Date;
  location: GeocodingFeatureDto;
}
