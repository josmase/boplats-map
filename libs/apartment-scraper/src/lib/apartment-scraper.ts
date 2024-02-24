import * as cheerio from 'cheerio';
import { parseApartments } from './parser/apartment-parser';
import { Logger } from '@nestjs/common';

async function search(url: URL | RequestInfo) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    return cheerio.load(html);
  } catch (error) {
    Logger.log(error);
  }
}

export async function scrapeApartments(url: URL | RequestInfo) {
  const document = await search(url);
  return parseApartments(document);
}
