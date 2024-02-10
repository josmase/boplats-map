import mongoose, { Document, Schema } from 'mongoose';
import { GeocodingFeature } from '../nominatim/response';

const GeocodingFeatureSchema = new Schema<GeocodingFeature>({
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
});

export interface GeocodingFeatureModel extends GeocodingFeature, Document {}
export const GeocodingFeatureModel = mongoose.model<GeocodingFeatureModel>(
  'GeocodingFeature',
  GeocodingFeatureSchema
);
