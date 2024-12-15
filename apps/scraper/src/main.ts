import ApartmentService from "./app/apartment.service.ts";
import { scraperConfiguration } from "./app/config/scraper.configuration.ts";
import { geoCodingService } from "@new-new-boplats/geocoding";
import { apartmentRepository } from "@new-new-boplats/apartment-repository";
import { mongooseModule } from "@new-new-boplats/mongoose";

async function main() {
  await mongooseModule.connect();
  const apartmentService = new ApartmentService(
    scraperConfiguration,
    apartmentRepository,
    geoCodingService,
  );

  await apartmentService.scrapeAndSaveApartments();
}

main();
