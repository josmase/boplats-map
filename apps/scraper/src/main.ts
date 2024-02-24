/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ApartmentService } from './app/apartment.service';
import { exit } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const myService = app.get(ApartmentService);
  await myService.scrapeAndSaveApartments();
  exit();
}

bootstrap();
