import type * as cheerio from "cheerio";
import type { Apartment } from "../../../../apartment-repository/src/mod.ts";
import {
  parseFloor,
  parsePrice,
  parsePublicationDate,
  parseRoomCount,
  parseSize,
} from "./apartment-parser-helpers.ts";

export function parseApartments($: cheerio.CheerioAPI): Partial<Apartment>[] {
  let apartments: Partial<Apartment>[] = [];

  $(".item").each((_index, resultItem) => {
    const apartment = parseApartment($, resultItem);
    apartments = [...apartments, apartment];
  });

  return apartments;
}

function parseApartment(
  $: cheerio.CheerioAPI,
  // deno-lint-ignore no-explicit-any
  resultItem: any,
): Partial<Apartment> {
  const link = $(resultItem).find(".search-result-link").attr("href");
  const imageUrls = $(resultItem)
    .find(".mob-thumb img")
    .map((_index, element) => $(element).attr("src"))
    .get();
  const areaName = $(resultItem).find(".search-result-area-name").text().trim();
  const price = $(resultItem).find(".search-result-price").text().trim();
  const address = $(resultItem).find(".search-result-address").text().trim();
  const size = $(resultItem)
    .find(".mob-info-container .pure-u-2-5.right-align")
    .text()
    .trim();
  const floorInfo = $(resultItem).find(".search-result-floors").text().trim();
  const roomCount = $(resultItem).find(".pure-u-1-4.right-align").text().trim();
  const publDate = $(resultItem).find(".publ-date").text().trim();

  return {
    link,
    imageUrls,
    areaName,
    price: parsePrice(price),
    address,
    size: parseSize(size),
    floor: parseFloor(floorInfo),
    roomCount: parseRoomCount(roomCount),
    publishedAt: parsePublicationDate(publDate, new Date()),
  };
}
