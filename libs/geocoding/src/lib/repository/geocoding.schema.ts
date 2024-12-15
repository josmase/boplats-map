import { type Document, model, Schema } from "mongoose";

export interface GeocodingFeature extends Document {
  queryId: string;
  type?: string;
  properties?: {
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
  };
  bbox?: [number, number, number, number];
  geometry?: {
    type: string;
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
}

const GeocodingFeatureSchema = new Schema<GeocodingFeature>(
  {
    queryId: { type: String, required: true, unique: true },
    type: { type: String },
    properties: {
      place_id: { type: Number },
      osm_type: { type: String },
      osm_id: { type: Number },
      place_rank: { type: Number },
      category: { type: String },
      type: { type: String },
      importance: { type: Number },
      addresstype: { type: String },
      name: { type: String },
      display_name: { type: String },
    },
    bbox: {
      type: [Number],
      validate: {
        validator: (v: number[]) => v.length === 4,
        message: "bbox must have exactly four numbers",
      },
    },
    geometry: {
      type: {
        type: String,
      },
      coordinates: {
        type: [Number],
        validate: {
          validator: (v: number[]) => v.length === 2,
          message: "geometry.coordinates must have exactly two numbers",
        },
      },
    },
  },
  { timestamps: true },
);

export const GeocodingFeatureModel = model<GeocodingFeature>(
  "GeocodingFeature",
  GeocodingFeatureSchema,
);
