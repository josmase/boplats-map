import { Inject, Injectable, Logger } from '@nestjs/common';
import { Apartment, ApartmentRepository } from '@boplats-map/apartment';
import { scrapeApartments } from '@boplats-map/apartment-scraper';
import { GeocodingService } from '@boplats-map/geocoding';
import { mapApartmentToStructuredQuery } from './helper';
import boplatsConfiguration from './config/boplats.configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApartmentService {
  constructor(
    @Inject(boplatsConfiguration.KEY)
    private readonly config: ConfigType<typeof boplatsConfiguration>,
    private readonly apartmentRepository: ApartmentRepository,
    private readonly geocodingService: GeocodingService
  ) {}

  async scrapeAndSaveApartments(): Promise<void> {
    try {
      const apartments = await scrapeApartments(this.config.uri);
      const apartmentsWithFeatures = await this.getApartmentsWithFeature(
        apartments
      );
      const pendingApartments = apartmentsWithFeatures.map((apartment) =>
        this.apartmentRepository.upsertApartment(apartment)
      );
      await Promise.all(pendingApartments);
    } catch (error) {
      throw new Error(`Error scraping and saving apartments: ${error.message}`);
    }
  }

  private async getApartmentsWithFeature(
    apartments: Partial<Apartment>[]
  ): Promise<Partial<Apartment>[]> {
    let apartmentFeatures: Partial<Apartment>[] = [];
    for (const apartment of apartments) {
      try {
        const structuredQuery = mapApartmentToStructuredQuery(apartment);
        const feature = await this.geocodingService.fetchAndSaveGeocodingData(
          structuredQuery
        );
        apartmentFeatures.push({ ...apartment, location: feature });
      } catch (error) {
        Logger.error(
          `Error fetching geocoding data for apartment: ${error.message}`
        );
      }
    }
    return apartmentFeatures;
  }
}
