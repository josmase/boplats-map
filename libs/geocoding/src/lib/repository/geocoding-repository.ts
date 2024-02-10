import { Model } from 'mongoose';
import { GeocodingFeature, GeocodingResponse } from '../nominatim/response';
import { GeocodingFeatureModel } from './geocoding-model';

export class GeocodingRepository {
  constructor(private readonly model: Model<GeocodingFeatureModel>) {}

  async create(
    queryId: string,
    feature: GeocodingFeature | GeocodingFeatureModel
  ): Promise<GeocodingFeature | GeocodingFeatureModel> {
    const savedFeatures = await this.model.create({
      _id: queryId,
      ...feature,
    });
    return savedFeatures;
  }

  async findById(
    _id: string
  ): Promise<GeocodingFeature | GeocodingFeatureModel | null> {
    return this.model.findOne({ _id: _id });
  }
}
