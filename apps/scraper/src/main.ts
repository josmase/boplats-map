import * as cheerio from 'cheerio';
import { parseApartments } from './parser/apartment-parser';

const url =
  'https://nya.boplats.se/sok?types=1hand&area=508A8CB406FE001F00030A60';

async function search() {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const apartments = parseApartments($);
    console.dir(apartments);
  } catch (error) {
    console.log(error);
  }
}

search();

function parseApartment(apartment: number): any {
  throw new Error('Function not implemented.');
}
