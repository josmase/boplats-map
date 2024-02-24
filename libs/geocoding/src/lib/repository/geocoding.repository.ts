import { Model } from 'mongoose';
import { GeocodingFeature } from './geocoding.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GeocodingRepository {
  constructor(
    @InjectModel(GeocodingFeature.name)
    private readonly model: Model<GeocodingFeature>
  ) {}

  async create(feature: Partial<GeocodingFeature>): Promise<GeocodingFeature> {
    Logger.debug(`${feature.queryId}: Creating feature`);
    const savedFeature = await this.model.create(feature);
    Logger.debug(`${feature.queryId}: Created feature`);
    return savedFeature;
  }

  async findById(queryId: string): Promise<GeocodingFeature | null> {
    return this.model.findOne({ queryId }).exec();
  }
}
