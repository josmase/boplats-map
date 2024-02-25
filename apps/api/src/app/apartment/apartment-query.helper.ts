import { Apartment } from '@boplats-map/apartment';
import { FilterQuery } from 'mongoose';
import { GetApartmentRequest } from './requests/get-apartment.request';

interface DateQuery {
  updatedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

interface RoomsQuery {
  rooms?: {
    $gte?: number;
    $lte?: number;
  };
}

interface RentQuery {
  rent?: {
    $gte?: number;
    $lte?: number;
  };
}

interface SizeQuery {
  size?: {
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
    ...buildRentQuery(request),
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
    query.rooms = { $gte: request.roomsMin };
  }
  if (request.roomsMax) {
    query.rooms = { ...query.rooms, $lte: request.roomsMax };
  }
  return query;
}

function buildRentQuery(request?: GetApartmentRequest): RentQuery {
  if (!request) {
    return {};
  }

  const query: RentQuery = {};
  if (request.rentMin) {
    query.rent = { $gte: request.rentMin };
  }
  if (request.rentMax) {
    query.rent = { ...query.rent, $lte: request.rentMax };
  }
  return query;
}

function buildSizeQuery(request?: GetApartmentRequest): SizeQuery {
  if (!request) {
    return {};
  }

  const query: SizeQuery = {};
  if (request.sizeMin) {
    query.size = { $gte: request.sizeMin };
  }
  if (request.sizeMax) {
    query.size = { ...query.size, $lte: request.sizeMax };
  }
  return query;
}
