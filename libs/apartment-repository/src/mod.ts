import { ApartmentRepository } from "./lib/apartment-repository.ts";
import { ApartmentModel } from "./lib/apartment.schema.ts";

export type * from "./lib/apartment.ts";
export type { ApartmentRepository };

export const apartmentRepository = new ApartmentRepository(ApartmentModel);
