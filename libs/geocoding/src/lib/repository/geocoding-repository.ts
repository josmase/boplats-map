import { Model, isObjectIdOrHexString } from 'mongoose';
import { GeocodingFeature, GeocodingResponse } from '../nominatim/response';
import { GeocodingFeatureModel } from './geocoding-model';
import { Types } from 'mongoose';

export class GeocodingRepository {
  constructor(private readonly model: Model<GeocodingFeatureModel>) {}

  async create(
    queryId: string,
    feature: GeocodingFeature | GeocodingFeatureModel
  ): Promise<GeocodingFeature | GeocodingFeatureModel> {
    const savedFeatures = await this.model.create({
      queryId,
      ...feature,
    });
    return savedFeatures;
  }

  async findById(
    queryId: string
  ): Promise<GeocodingFeature | GeocodingFeatureModel | null> {
    return this.model.findOne({ queryId });
  }
}
