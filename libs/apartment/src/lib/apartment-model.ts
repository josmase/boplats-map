import { model, Schema } from 'mongoose';
import { Apartment } from './aparment';

const apartmentSchema = new Schema<Apartment>({
  link: { type: String, required: true, unique: true },
  imageUrls: { type: [String], required: true },
  areaName: { type: String, required: true },
  price: {
    amount: { type: Number },
    currency: { type: String },
  },
  address: { type: String, required: true },
  size: {
    amount: { type: Number },
    unit: { type: String },
  },
  floor: {
    actual: { type: Number, required: true },
    total: { type: Number },
  },
  roomCount: { type: Number },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

apartmentSchema.pre<Apartment>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export interface ApartmentModel extends Apartment, Document {}
export const ApartmentModel = model<ApartmentModel>(
  'Apartment',
  apartmentSchema
);
