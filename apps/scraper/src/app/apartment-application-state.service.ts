import {
    Apartment,
    type ApartmentRepository,
} from "@new-new-boplats/apartment-repository";
import { getApplicationStateForApartment } from "@new-new-boplats/apartment-application-state-scraper";
import { rateLimit } from "@new-new-boplats/rate-limit";
import type { ScraperConfiguration } from "./config/scraper.configuration.ts";

export default class ApartmentApplicationStateService {
    constructor(
        private readonly apartmentRepository: ApartmentRepository,
        private readonly scraperConfiguration: ScraperConfiguration,
    ) {}

    async updateApplicationStateForAllCurrentlyOpenApartments() {
        const apartments = await this.getCurrentlyOpenApartments();
        await rateLimit(
            apartments.map((apartment) => () =>
                this.updateApartmentApplicationState(apartment)
            ),
            this.scraperConfiguration.timeBetweenRequestsMs,
        );
    }

    private async getCurrentlyOpenApartments(): Promise<Apartment[]> {
        try {
            console.info("Fetching currently open apartments");
            const openApartments = await this.apartmentRepository
                .searchApartments({
                    applicationState: "open",
                });
            console.info(`Found ${openApartments.length} open apartments`);
            return openApartments;
        } catch (error) {
            console.error("Error fetching apartments", error);
            return [];
        }
    }

    private async updateApartmentApplicationState(
        apartment: Apartment,
    ): Promise<void> {
        try {
            console.info(
                "Getting application state for apartment",
                apartment.link,
            );
            const applicationState = await getApplicationStateForApartment(
                apartment.link,
            );
            if (applicationState === "closed") {
                console.info(
                    `Updating application state for apartment ${apartment.link} to closed`,
                );
                apartment.applicationState = applicationState;
                await this.apartmentRepository.upsertApartment(apartment);
            }
        } catch (error) {
            console.error(
                "Unable to update apartment application state",
                error,
            );
        }
    }
}
