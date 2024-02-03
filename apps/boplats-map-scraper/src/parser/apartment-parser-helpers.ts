import { parseISO } from 'date-fns';
import { Floor, Price, Size } from '../aparment';

export function parsePrice(price: string): Price | null {
  const regex = /^(\d[\d\s]*)\s+(\w+)$/;
  const match = price.match(regex);

  if (match) {
    const amount = parseInt(match[1].replace(/\s/g, ''), 10);
    const currency = match[2];
    return { amount, currency };
  }
  console.warn('Unable to parse price:', price);
  return null;
}

export function parseSize(size: string): Size | null {
  const regex = /^([\d.]+)\s+(.+)/;
  const match = size.match(regex);

  if (match) {
    const amount = parseFloat(match[1]);
    const unit = match[2];

    return { amount, unit };
  }
  console.warn('Unable to parse size:', size);
  return null;
}

export function parsePublicationDate(date: string, today: Date) {
  return parseDateString(date.replace('Publ.', '').trim(), today);
}

function parseDateString(unparsedDate: string, today: Date) {
  if (unparsedDate.toLowerCase() === 'idag') {
    return today;
  }

  if (unparsedDate.toLowerCase() === 'igår') {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
  }

  if (unparsedDate.toLowerCase() === 'i förrgår') {
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);
    return dayBeforeYesterday;
  }

  const parsedDate = parseISO(unparsedDate);
  if (isNaN(parsedDate.getTime())) {
    console.warn('Unable to parse date:', unparsedDate);
    return null;
  }
  return parsedDate;
}

export function parseFloor(floor: string): Floor | null {
  const regex = /(\d+)\s+av\s+(\d+)/;

  const match = floor.match(regex);

  if (match) {
    const actual = parseInt(match[1], 10);
    const total = parseInt(match[2], 10);
    return { actual, total };
  }

  const regexMissingNumberOfFloors = /(\d+)/;
  const matchMissingNumberOfFloors = floor.match(regexMissingNumberOfFloors);

  if (matchMissingNumberOfFloors) {
    const actual = parseInt(matchMissingNumberOfFloors[1], 10);
    return { actual };
  }

  console.warn('Unable to parse floor:', floor);
  return null;
}

export function parseRoomCount(roomCount: string): number | null {
  const regex = /^(\d+)\s+rum$/;

  const match = roomCount.match(regex);
  if (match) {
    const number = parseInt(match[1], 10);
    return number;
  }
  return null;
}
