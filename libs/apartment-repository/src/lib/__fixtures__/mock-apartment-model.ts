import type { Model } from "mongoose";
import type { Apartment } from "@boplats/apartment-repository";

export function createMockApartmentModel(): any {
  return {
    findOneAndUpdate: (filter: any, update: any, options: any) =>
      Promise.resolve(update),
    findOneAndDelete: (filter: any) => Promise.resolve({}),
  } as any as Model<Apartment>;
}

export function createFailingApartmentModel(errorMessage: string = "DB Error"): any {
  return {
    findOneAndUpdate: () => Promise.reject(new Error(errorMessage)),
    findOneAndDelete: () => Promise.reject(new Error(errorMessage)),
  } as any as Model<Apartment>;
}
