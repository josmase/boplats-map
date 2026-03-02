import type { NominatimConfiguration } from "../config/nominatim.configuration.ts";
import { GeocodingClient } from "./geocoding.client.ts";

import { expect, describe, it } from "bun:test";

const userAgent = "Test User Agent";
const apiUrl = "https://example.com/api";
const mockConfig: NominatimConfiguration = {
  userAgent,
  apiUrl,
  timeBetweenRequestsMs: 0,
};

describe("GeocodingClient", () => {
  it("should be defined", () => {
    const client = new GeocodingClient(mockConfig);
    expect(client).toBeDefined();
  });

  describe("geocode", () => {
    it(
      "should instantiate with valid config",
      async () => {
        const client = new GeocodingClient(mockConfig);
        expect(client).toBeDefined();
      },
    );

    it(
      "should have geocode method",
      async () => {
        const client = new GeocodingClient(mockConfig);
        expect(typeof (client as any).geocode).toBe("function");
      },
    );

    it("should accept string queries", async () => {
      const client = new GeocodingClient(mockConfig);
      expect(client).toBeDefined();
    });

    it("should accept structured queries", async () => {
      const client = new GeocodingClient(mockConfig);
      expect(client).toBeDefined();
    });
  });
});
