import * as cheerio from 'cheerio';
import { parseISO } from 'date-fns';
import { Apartment, Floor, Price, Size } from '../aparment';
import {
  parseFloor,
  parsePrice,
  parsePublicationDate,
  parseRoomCount,
  parseSize,
} from './apartment-parser-helpers';

export function parseApartments($: cheerio.CheerioAPI): Apartment[] {
  let apartments: Apartment[] = [];

  $('.item').each((index, resultItem) => {
    const apartment = parseApartment($, resultItem);
    apartments = [...apartments, apartment];
  });

  return apartments;
}

function parseApartment(
  $: cheerio.CheerioAPI,
  resultItem: cheerio.Element
): Apartment {
  const link = $(resultItem).find('.search-result-link').attr('href');
  const imageUrls = $(resultItem)
    .find('.mob-thumb img')
    .map((index, element) => $(element).attr('src'))
    .get();
  const areaName = $(resultItem).find('.search-result-area-name').text().trim();
  const price = $(resultItem).find('.search-result-price').text().trim();
  const address = $(resultItem).find('.search-result-address').text().trim();
  const size = $(resultItem)
    .find('.mob-info-container .pure-u-2-5.right-align')
    .text()
    .trim();
  const floorInfo = $(resultItem).find('.search-result-floors').text().trim();
  const roomCount = $(resultItem).find('.pure-u-1-2.right-align').text().trim();
  const publDate = $(resultItem).find('.publ-date').text().trim();

  return {
    link,
    imageUrls,
    areaName,
    price: parsePrice(price),
    address,
    size: parseSize(size),
    floor: parseFloor(floorInfo),
    roomCount: parseRoomCount(roomCount),
    published: parsePublicationDate(publDate, new Date()),
    updated: new Date(),
  };
}
