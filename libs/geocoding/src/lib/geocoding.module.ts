import { MongooseModule } from '@nestjs/mongoose';
import {
  GeocodingFeature,
  GeocodingFeatureSchema,
} from './repository/geocoding.schema';
import { GeocodingRepository } from './repository/geocoding.repository';
import { GeocodingService } from './geocoding.service';
import { Module } from '@nestjs/common';
import { GeocodingClient } from './nominatim/geocoding.client';
import { ConfigModule } from '@nestjs/config';
import nominatimConfiguration from './config/nominatim.configuration';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GeocodingFeature.name, schema: GeocodingFeatureSchema },
    ]),
    ConfigModule.forFeature(nominatimConfiguration),
  ],
  providers: [GeocodingRepository, GeocodingService, GeocodingClient],
  exports: [GeocodingService],
})
export class GeoCodingModule {}
