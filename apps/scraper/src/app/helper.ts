import { Apartment } from "@new-new-boplats/apartment-repository";
import { StructuredQuery } from "@new-new-boplats/geocoding";

export function mapApartmentToStructuredQuery(
  apartment: Partial<Apartment>,
): Partial<StructuredQuery> {
  return {
    street: apartment?.address,
    city: apartment?.areaName,
    country: "Sweden",
  };
}
