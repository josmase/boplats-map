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
          pass: config.password,
          user: config.username,
          autoIndex: true,
          autoCreate: true,
        };
        const censoredConfig = {
          ...mongooseConfig,
          pass: '************',
        };
        Logger.log(
          `Database configuration loaded successfully: ${JSON.stringify(
            censoredConfig
          )}`,
          'DatabaseModule'
        );
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
