import {
  Apartment,
  ApartmentRepository,
} from "@new-new-boplats/apartment-repository";

import { GeocodingService } from "@new-new-boplats/geocoding";
import { ScraperConfiguration } from "./config/scraper.configuration.ts";
import { mapApartmentToStructuredQuery } from "./helper.ts";
import { scrapeApartments } from "@new-new-boplats/apartment-scraper";

export default class ApartmentService {
  constructor(
    private readonly config: ScraperConfiguration,
    private readonly apartmentRepository: ApartmentRepository,
    private readonly geocodingService: GeocodingService,
  ) {}

  async scrapeAndSaveApartments(): Promise<void> {
    try {
      const apartments = await scrapeApartments(this.config.uri);
      const apartmentsWithFeatures = await this.getApartmentsWithFeature(
        apartments,
      );
      const pendingApartments = apartmentsWithFeatures.map((apartment) =>
        this.apartmentRepository.upsertApartment(apartment)
      );
      await Promise.all(pendingApartments);
    } catch (error) {
      throw new Error(`Error scraping and saving apartments: ${error}`);
    }
  }

  private async getApartmentsWithFeature(
    apartments: Partial<Apartment>[],
  ): Promise<Partial<Apartment>[]> {
    const apartmentFeatures: Partial<Apartment>[] = [];
    for (const apartment of apartments) {
      try {
        const structuredQuery = mapApartmentToStructuredQuery(apartment);
        const feature = await this.geocodingService.fetchAndSaveGeocodingData(
          structuredQuery,
        );
        apartmentFeatures.push({ ...apartment, location: feature });
      } catch (error) {
        console.error(
          `Error fetching geocoding data for apartment: ${error}`,
        );
      }
    }
    return apartmentFeatures;
  }
}
