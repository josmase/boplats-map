import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class GeocodingFeature {
  @Prop({ required: true, unique: true })
  queryId: string;

  @Prop()
  type: string;

  @Prop({ type: Object })
  properties: {
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

  @Prop()
  bbox: [number, number, number, number];

  @Prop({ type: Object })
  geometry: {
    type: string;
    coordinates: [number, number];
  };

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
export type GeoCodingDocument = HydratedDocument<GeocodingFeature>;
export const GeocodingFeatureSchema =
  SchemaFactory.createForClass(GeocodingFeature);
