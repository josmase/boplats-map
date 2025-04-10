import NewApartmentService from "./app/new-apartments.service.ts";
import { scraperConfiguration } from "./app/config/scraper.configuration.ts";
import { geoCodingService } from "@new-new-boplats/geocoding";
import { apartmentRepository } from "@new-new-boplats/apartment-repository";
import { mongooseModule } from "@new-new-boplats/mongoose";
import ApartmentApplicationStateService from "./app/apartment-application-state.service.ts";

async function main() {
  await mongooseModule.connect();
  const apartmentService = new NewApartmentService(
    scraperConfiguration,
    apartmentRepository,
    geoCodingService,
  );

  try {
    console.info("Scraping apartments...");
    await apartmentService.scrapeAndSaveApartments();
  } catch (error) {
    console.error("Error scraping apartments:", error);
  }

  const apartmentApplicationStateService = new ApartmentApplicationStateService(
    apartmentRepository,
    scraperConfiguration,
  );

  try {
    console.info("Updating apartment application state...");
    await apartmentApplicationStateService
      .updateApplicationStateForAllCurrentlyOpenApartments();
  } catch (error) {
    console.error("Error updating apartment application state:", error);
  }
}

main();
