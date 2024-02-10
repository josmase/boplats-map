import { Apartment, createApartmentRepository } from '@boplats-map/apartment';
import { scrapeApartments } from '@boplats-map/apartment-scraper';
import { connectToDatabase } from '@boplats-map/database-utils';
import { createGeoCodingService } from '@boplats-map/geocoding';
import { mapApartmentToStructuredQuery } from './helper';

const url =
  process.env.BOPLATS_SEARCH_URI ||
  'https://nya.boplats.se/sok?types=1hand&area=508A8CB406FE001F00030A60';

const dbConfig = {
  uri:
    process.env.DB_URI || 'mongodb://localhost:27017/boplats?authSource=admin',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'example',
};

const geocodingConfig = {
  userAgent: process.env.USER_AGENT || 'Boplats-Map',
  apiUrl: process.env.API_URL || 'https://nominatim.openstreetmap.org',
  timeBetweenRequestsMs: parseInt(process.env.TIME_BETWEEN_REQUESTS_MS) || 1500,
};

const geocodingService = createGeoCodingService(geocodingConfig);
const apartmentRepository = createApartmentRepository();
async function run() {
  await connectToDatabase(dbConfig);
  const apartments = await scrapeApartments(url);
  const features = await getApartmentFeatures(apartments);
  const pendingApartments = apartments.map((apartment) =>
    apartmentRepository.upsertApartment(apartment)
  );
  await Promise.all(pendingApartments);
}

async function getApartmentFeatures(apartments: Partial<Apartment>[]) {
  let apartmentFeatures = [];
  for (const apartment of apartments) {
    const structuredQuery = mapApartmentToStructuredQuery(apartment);
    const feature = await geocodingService.fetchAndSaveGeocodingData(
      structuredQuery
    );
    apartmentFeatures = [...apartmentFeatures, { apartment, feature }];
  }
}

run();
