import { Model, isObjectIdOrHexString } from 'mongoose';
import { GeocodingFeature, GeocodingFeatureModel } from './geocoding-model';

export class GeocodingRepository {
  constructor(private readonly model: Model<GeocodingFeatureModel>) {}

  async create(
    feature: Partial<GeocodingFeature> | GeocodingFeatureModel
  ): Promise<GeocodingFeature | GeocodingFeatureModel> {
    console.debug(`${feature.queryId}: Creating feature`);
    const savedFeature = await this.model.create(feature);
    console.debug(`${feature.queryId}: Created feature`);
    return savedFeature;
  }

  async findById(
    queryId: string
  ): Promise<GeocodingFeature | GeocodingFeatureModel | null> {
    return this.model.findOne({ queryId });
  }
}
