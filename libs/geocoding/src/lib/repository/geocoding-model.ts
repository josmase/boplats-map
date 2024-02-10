import mongoose, { Document, Schema } from 'mongoose';
import { GeocodingFeature } from '../nominatim/response';

const GeocodingFeatureSchema = new Schema<GeocodingFeature>({
  queryId: { type: String, required: true, unique: true },
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

GeocodingFeatureSchema.pre<GeocodingFeature>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export interface GeocodingFeatureModel
  extends GeocodingFeature,
    Document<string> {}
export const GeocodingFeatureModel = mongoose.model<GeocodingFeatureModel>(
  'GeocodingFeature',
  GeocodingFeatureSchema
);
