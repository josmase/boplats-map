export type ScraperConfiguration = typeof scraperConfiguration;

export const scraperConfiguration = {
  uri: Deno.env.get("BOPLATS_SEARCH_URI") ||
    "https://nya.boplats.se/sok?types=1hand&area=508A8CB406FE001F00030A60",
};
