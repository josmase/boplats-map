import { model, Schema, Document } from 'mongoose';
import { Apartment } from './apartment';

const apartmentSchema = new Schema<Apartment>(
  {
    link: { $type: String, required: true, unique: true },
    imageUrls: { $type: [String], required: true },
    areaName: { $type: String, required: true },
    price: {
      amount: { $type: Number },
      currency: { $type: String },
    },
    address: { $type: String, required: true },
    size: {
      amount: { $type: Number },
      unit: { $type: String },
    },
    floor: {
      actual: { $type: Number, required: true },
      total: { $type: Number },
    },
    roomCount: { $type: Number },
    publishedAt: { $type: Date },
    location: {
      queryId: { $type: String, required: true, unique: true },
      type: String,
      properties: {
        place_id: Number,
        osm_type: String,
        osm_id: Number,
        place_rank: Number,
        category: String,
        type: String,
        importance: Number,
        addresstype: String,
        name: String,
        display_name: String,
      },
      bbox: [Number],
      geometry: {
        type: String,
        coordinates: [Number],
      },
      createdAt: { $type: Date, default: Date.now },
      updatedAt: { $type: Date, default: Date.now },
    },
    createdAt: { $type: Date, default: Date.now },
    updatedAt: { $type: Date, default: Date.now },
  },
  { typeKey: '$type' }
);

apartmentSchema.pre<Apartment>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export interface ApartmentModel extends Apartment, Document {}
export const ApartmentModel = model<ApartmentModel>(
  'Apartment',
  apartmentSchema
);
