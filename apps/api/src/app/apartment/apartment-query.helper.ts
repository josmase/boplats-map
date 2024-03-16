import { Apartment } from '@boplats-map/apartment';
import { FilterQuery } from 'mongoose';
import { GetApartmentRequest } from '@boplats-map/api-schema';

interface DateQuery {
  updatedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

interface RoomsQuery {
  roomCount?: {
    $gte?: number;
    $lte?: number;
  };
}

interface PriceQuery {
  'price.amount'?: {
    $gte?: number;
    $lte?: number;
  };
}

interface SizeQuery {
  'size.amount'?: {
    $gte?: number;
    $lte?: number;
  };
}

export function createQueryFromRequest(
  request: GetApartmentRequest
): FilterQuery<Apartment> {
  return {
    ...buildDateQuery(request),
    ...buildRoomsQuery(request),
    ...buildPriceQuery(request),
    ...buildSizeQuery(request),
  };
}

function buildDateQuery(request?: GetApartmentRequest): DateQuery {
  if (!request) {
    return {};
  }

  const query: DateQuery = {};
  if (request.dateStart) {
    query.updatedAt = { $gte: request.dateStart };
  }
  if (request.dateEnd) {
    query.updatedAt = { ...query.updatedAt, $lte: request.dateEnd };
  }
  return query;
}

function buildRoomsQuery(request?: GetApartmentRequest): RoomsQuery {
  if (!request) {
    return {};
  }

  const query: RoomsQuery = {};
  if (request.roomsMin) {
    query.roomCount = { $gte: request.roomsMin };
  }
  if (request.roomsMax) {
    query.roomCount = { ...query.roomCount, $lte: request.roomsMax };
  }
  return query;
}

function buildPriceQuery(request?: GetApartmentRequest): PriceQuery {
  if (!request) {
    return {};
  }

  let query: PriceQuery = {};
  if (request.rentMin) {
    query['price.amount'] = { $gte: request.rentMin };
  }
  if (request.rentMax) {
    query['price.amount'] = { ...query['price.amount'], $lte: request.rentMax };
  }
  return query;
}

function buildSizeQuery(request?: GetApartmentRequest): SizeQuery {
  if (!request) {
    return {};
  }

  let query: SizeQuery = {};
  if (request.sizeMin) {
    query['size.amount'] = { $gte: request.sizeMin };
  }
  if (request.sizeMax) {
    query['size.amount'] = { ...query['size.amount'], $lte: request.sizeMax };
  }

  return query;
}
