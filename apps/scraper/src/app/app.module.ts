import { Logger, Module } from '@nestjs/common';
import { ApartmentModule } from '@boplats-map/apartment';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { GeoCodingModule } from '@boplats-map/geocoding';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfiguration from './config/database.configuration';
import { ApartmentService } from './apartment.service';
import boplatsConfiguration from './config/boplats.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [boplatsConfiguration],
    }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfiguration],
        }),
      ],
      useFactory: async (config: ConfigType<typeof databaseConfiguration>) => {
        Logger.log(config);
        return {
          uri: config.uri,
          pass: config.password,
          user: config.username,
          autoIndex: true,
          autoCreate: true,
        };
      },
      inject: [databaseConfiguration.KEY],
    }),
    ApartmentModule,
    GeoCodingModule,
  ],
  providers: [ApartmentService],
})
export class AppModule {}
