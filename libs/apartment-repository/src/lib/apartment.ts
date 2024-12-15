import type { GeocodingFeature } from "@new-new-boplats/geocoding";
import type { Document } from "mongoose";
export interface Apartment extends Document {
  link: string;
  imageUrls: string[];
  areaName: string;
  price?: Price;
  address: string;
  size?: Size;
  floor?: Floor;
  roomCount?: number;
  publishedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
  location: GeocodingFeature;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface Size {
  amount: number;
  unit: string;
}

export interface Floor {
  actual: number;
  total?: number;
}
