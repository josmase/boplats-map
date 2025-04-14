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
        const apartments = await this.getCurrentlyNonClosedApartments();
        await rateLimit(
            apartments.map((apartment) => () =>
                this.updateApartmentApplicationState(apartment)
            ),
            this.scraperConfiguration.timeBetweenRequestsMs,
        );
    }

    private async getCurrentlyNonClosedApartments(): Promise<Apartment[]> {
        try {
            console.info(
                "Fetching open apartments published more than 5 days ago",
            );
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

            const openApartments = await this.apartmentRepository
                .searchApartments({
                    applicationState: { $ne: "closed" },
                    publishedAt: { $lt: fiveDaysAgo },
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
            } else if (applicationState === "open") {
                console.info(
                    `Updating application state for apartment ${apartment.link} to open`,
                );
                apartment.applicationState = applicationState;
                await this.apartmentRepository.upsertApartment(apartment);
            } else {
                console.info(
                    `No update needed for apartment ${apartment.link}, current state: ${applicationState}`,
                );
            }
        } catch (error) {
            console.error(
                "Unable to update apartment application state",
                error,
            );
        }
    }
}
