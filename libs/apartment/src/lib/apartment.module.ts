import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Apartment, ApartmentSchema } from './apartment.schema';
import { ApartmentRepository } from './apartment-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  providers: [ApartmentRepository],
  exports: [ApartmentRepository],
})
export class ApartmentModule {}
