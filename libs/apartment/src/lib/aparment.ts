import { Document } from 'mongoose';
import { Location } from '@boplats-map/location';

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
  location: Location;
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
