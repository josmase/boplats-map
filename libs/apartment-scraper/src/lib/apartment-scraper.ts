import * as cheerio from "cheerio";
import { parseApartments } from "./parser/apartment-parser.ts";

async function search(url: URL | RequestInfo) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    return cheerio.load(html);
  } catch (error) {
    console.log(error);
  }
}

export async function scrapeApartments(url: URL | RequestInfo) {
  const document = await search(url);
  if (!document) {
    throw new Error("Unable to create document for scraping: " + url);
  }
  return parseApartments(document);
}
