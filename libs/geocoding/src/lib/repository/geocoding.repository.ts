import type { Model } from "mongoose";
import type { GeocodingFeature } from "./geocoding.schema.ts";

export class GeocodingRepository {
  constructor(
    private readonly model: Model<GeocodingFeature>,
  ) {}

  async create(feature: Partial<GeocodingFeature>): Promise<GeocodingFeature> {
    console.debug(`${feature.queryId}: Creating feature`);
    const savedFeature = await this.model.create(feature);
    console.debug(`${feature.queryId}: Created feature`);
    return savedFeature;
  }

  async findById(queryId: string): Promise<GeocodingFeature | null> {
    return await this.model.findOne({ queryId }).exec();
  }
}
