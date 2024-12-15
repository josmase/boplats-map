export type NominatimConfiguration = typeof nominatimConfiguration;

export const nominatimConfiguration = {
  userAgent: Deno.env.get("USER_AGENT") || "Boplats-Map",
  apiUrl: Deno.env.get("API_URL") ||
    "https://nominatim.openstreetmap.org",
  timeBetweenRequestsMs: parseInt(
    Deno.env.get("TIME_BETWEEN_REQUESTS_MS") || "1500",
  ),
};
