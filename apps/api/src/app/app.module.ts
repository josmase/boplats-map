import { Module } from '@nestjs/common';

import { ApartmentController } from './apartment/apartment.controller';
import { ApartmentService } from './apartment/apartment.service';
import { ApartmentModule } from '@boplats-map/apartment';
import { MongooseModule } from '@boplats-map/mongoose';

@Module({
  imports: [MongooseModule, ApartmentModule],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class AppModule {}
