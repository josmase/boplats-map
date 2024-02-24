import { Apartment } from '@boplats-map/apartment';
import { StructuredQuery } from '@boplats-map/geocoding';

export function mapApartmentToStructuredQuery(
  apartment: Partial<Apartment>
): Partial<StructuredQuery> {
  return {
    street: apartment?.address,
    city: apartment?.areaName,
    country: 'Sweden',
  };
}
