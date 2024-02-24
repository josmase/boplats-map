// apartment.model.ts
import { GeocodingFeature } from '@boplats-map/geocoding';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

@Schema({ timestamps: true }) // Enable timestamps for createdAt and updatedAt fields
export class Apartment {
  @Prop({ required: true, unique: true })
  link: string;

  @Prop({ type: [String], required: true })
  imageUrls: string[];

  @Prop({ required: true })
  areaName: string;

  @Prop({ type: Object })
  price: Price;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Object })
  size: Size;

  @Prop({ required: true, type: Object })
  floor: Floor;

  @Prop()
  roomCount: number;

  @Prop()
  publishedAt: Date;

  @Prop({ required: true, unique: true, type: Object })
  location: GeocodingFeature;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
