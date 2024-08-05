import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule as NestJsMongooseModule } from '@nestjs/mongoose';
import databaseConfiguration from './config/database.configuration';

@Module({
  imports: [
    NestJsMongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfiguration],
        }),
      ],
      useFactory: async (config: ConfigType<typeof databaseConfiguration>) => {
        const mongooseConfig = {
          uri: config.uri,
          autoIndex: true,
          autoCreate: true,
        };
        return mongooseConfig;
      },
      inject: [databaseConfiguration.KEY],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class MongooseModule {}
