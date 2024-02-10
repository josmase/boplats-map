import { Model, isObjectIdOrHexString } from 'mongoose';
import { GeocodingFeature, GeocodingResponse } from '../nominatim/response';
import { GeocodingFeatureModel } from './geocoding-model';

export class GeocodingRepository {
  constructor(private readonly model: Model<GeocodingFeatureModel>) {}

  async create(
    queryId: string,
    feature: GeocodingFeature | GeocodingFeatureModel
  ): Promise<GeocodingFeature | GeocodingFeatureModel> {
    console.debug(`${queryId}: Creating feature`);
    const savedFeature = await this.model.create({ queryId, ...feature });
    console.debug(`${queryId}: Created feature`);
    return savedFeature;
  }

  async findById(
    queryId: string
  ): Promise<GeocodingFeature | GeocodingFeatureModel | null> {
    return this.model.findOne({ queryId });
  }
}
