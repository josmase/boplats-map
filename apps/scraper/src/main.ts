import { upsertApartment } from '@boplats-map/apartment';
import { scrapeApartments } from '@boplats-map/apartment-scraper';
import { connectToDatabase } from '@boplats-map/database-utils';

const url =
  process.env.BOPLATS_SEARCH_URI ||
  'https://nya.boplats.se/sok?types=1hand&area=508A8CB406FE001F00030A60';

const dbConfig = {
  uri:
    process.env.DB_URI || 'mongodb://localhost:27017/boplats?authSource=admin',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'example',
};

async function run() {
  await connectToDatabase(dbConfig);
  const apartments = await scrapeApartments(url);
  const pendingApartments = apartments.map((apartment) =>
    upsertApartment(apartment)
  );
  await Promise.all(pendingApartments);
}

run();
