import { nominatimConfiguration } from "./lib/config/nominatim.configuration.ts";
import { GeocodingService } from "./lib/geocoding.service.ts";
import { KeyHasher } from "./lib/key-hasher.ts";
import { GeocodingClient } from "./lib/nominatim/geocoding.client.ts";
import { GeocodingRepository } from "./lib/repository/geocoding.repository.ts";
import { GeocodingFeatureModel } from "./lib/repository/geocoding.schema.ts";

export type { GeocodingService } from "./lib/geocoding.service.ts";
export type { StructuredQuery } from "./lib/nominatim/request.ts";
export type { GeocodingFeature } from "./lib/repository/geocoding.schema.ts";
const config = nominatimConfiguration;

export const geoCodingService = new GeocodingService(
  new GeocodingClient(config),
  new GeocodingRepository(GeocodingFeatureModel),
  config,
  new KeyHasher(),
);
