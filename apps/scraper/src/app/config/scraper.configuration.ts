export type ScraperConfiguration = typeof scraperConfiguration;

export const scraperConfiguration = {
  uri: process.env.BOPLATS_SEARCH_URI ||
    "https://nya.boplats.se/sok?types=1hand&area=508A8CB406FE001F00030A60",
    timeBetweenRequestsMs: parseInt(
      process.env.TIME_BETWEEN_SCRAPER_REQUESTS_MS || "500",
    ),
};
