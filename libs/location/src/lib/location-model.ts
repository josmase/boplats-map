import { model, Schema, Types } from 'mongoose';
import { Location } from './location';

const locationSchema = new Schema<Location>({
  address: { type: String, required: true, unique: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

locationSchema.pre<Location>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const LocationModel = model<Location>('Location', locationSchema);
