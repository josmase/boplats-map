import type { NominatimConfiguration } from "../config/nominatim.configuration.ts";
import { GeocodingClient } from "./geocoding.client.ts";

import { expect } from "@std/expect";
import { stub } from "@std/testing/mock";
import { describe, it } from "@std/testing/bdd";

const userAgent = "Test User Agent";
const apiUrl = "https://example.com/api";
const mockConfig: NominatimConfiguration = {
  userAgent,
  apiUrl,
  timeBetweenRequestsMs: 0,
};

Deno.test("GeocodingClient", () => {
  it("should be defined", () => {
    const client = new GeocodingClient(mockConfig);
    expect(client).toBeDefined();
  });
  describe("geocode", () => {
    it(
      "should perform geocoding successfully with string query",
      async () => {
        const client = new GeocodingClient(mockConfig);
        const mockResponse = [
          {},
        ];

        stub(globalThis, "fetch");

        const fetchStub = stub(
          globalThis,
          "fetch",
          () => Promise.resolve(new Response(JSON.stringify(mockResponse))),
        );

        const query = "London";
        const result = await client.geocode(query);

        expect(fetchStub).toHaveBeenCalledWith(
          `${apiUrl}?format=geojson&q=${query}`,
          {
            headers: {
              "User-Agent": userAgent,
            },
          },
        );
        expect(result).toEqual(mockResponse);
      },
    );

    it(
      "should perform geocoding successfully with structured query",
      async () => {
        const client = new GeocodingClient(mockConfig);
        const mockResponse = [
          {},
        ];

        stub(globalThis, "fetch");

        const fetchStub = stub(
          globalThis,
          "fetch",
          () => Promise.resolve(new Response(JSON.stringify(mockResponse))),
        );

        const query = { city: "London", country: "UK" };
        const result = await client.geocode(query);

        expect(fetchStub).toHaveBeenCalledWith(
          `${apiUrl}?format=geojson&city=London&country=UK`,
          {
            headers: {
              "User-Agent": userAgent,
            },
          },
        );
        expect(result).toEqual(mockResponse);
      },
    );

    it("should throw error if request fails", async () => {
      const client = new GeocodingClient(mockConfig);
      const mockResponse = [
        {},
      ];

      stub(
        globalThis,
        "fetch",
        () =>
          Promise.resolve(
            new Response(JSON.stringify(mockResponse), { status: 404 }),
          ),
      );

      const query = "London";
      await expect(client.geocode(query)).rejects.toThrow(
        "Request failed with status 404",
      );
    });

    it("should throw error if fetch fails", async () => {
      const client = new GeocodingClient(mockConfig);
      const mockResponse = [
        {},
      ];

      stub(
        globalThis,
        "fetch",
        () =>
          Promise.resolve(
            new Response(JSON.stringify(mockResponse), { status: 503 }),
          ),
      );
      const query = "London";
      await expect(client.geocode(query)).rejects.toThrow(
        "Error performing geocoding: Mocked fetch error",
      );
    });
  });
});
