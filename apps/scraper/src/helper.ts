import { Apartment } from '@boplats-map/apartment';
import { StructuredQuery } from '@boplats-map/geocoding';

export function mapApartmentToStructuredQuery(
  apartment: Partial<Apartment>
): Partial<StructuredQuery> {
  return {
    amenity: 'residential',
    street: apartment?.address,
    city: apartment?.areaName,
    country: 'Sweden',
  };
}
