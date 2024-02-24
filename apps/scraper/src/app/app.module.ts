import { Module } from '@nestjs/common';
import { ApartmentModule } from '@boplats-map/apartment';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { GeoCodingModule } from '@boplats-map/geocoding';
import { ApartmentService } from './apartment.service';
import boplatsConfiguration from './config/boplats.configuration';
import { MongooseModule } from '@boplats-map/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [boplatsConfiguration],
    }),
    MongooseModule,
    ApartmentModule,
    GeoCodingModule,
  ],
  providers: [ApartmentService],
})
export class AppModule {}
