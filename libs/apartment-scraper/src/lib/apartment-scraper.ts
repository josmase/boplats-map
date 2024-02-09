import * as cheerio from 'cheerio';
import { parseApartments } from './parser/apartment-parser';

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
  return parseApartments(document);
}
