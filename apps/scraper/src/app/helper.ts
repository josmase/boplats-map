import { Apartment } from "@boplats/apartment-repository";
import { StructuredQuery } from "@boplats/geocoding";

export function mapApartmentToStructuredQuery(
  apartment: Partial<Apartment>,
): Partial<StructuredQuery> {
  return {
    street: apartment?.address,
    city: apartment?.areaName,
    country: "Sweden",
  };
}
