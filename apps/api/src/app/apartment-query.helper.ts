import type { Apartment } from "@new-new-boplats/apartment-repository";
import type { GetApartmentRequest } from "./requests/get-apartment.request.ts";
import type { FilterQuery } from "mongoose";

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
  "price.amount"?: {
    $gte?: number;
    $lte?: number;
  };
}

interface SizeQuery {
  "size.amount"?: {
    $gte?: number;
    $lte?: number;
  };
}

export class ApartmentQueryHelper {
  createQueryFromRequest(
    request: GetApartmentRequest,
  ): FilterQuery<Apartment> {
    return {
      ...this.buildDateQuery(request),
      ...this.buildRoomsQuery(request),
      ...this.buildPriceQuery(request),
      ...this.buildSizeQuery(request),
    };
  }

  private buildDateQuery(request?: GetApartmentRequest): DateQuery {
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

  private buildRoomsQuery(request?: GetApartmentRequest): RoomsQuery {
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

  private buildPriceQuery(request?: GetApartmentRequest): PriceQuery {
    if (!request) {
      return {};
    }

    const query: PriceQuery = {};
    if (request.rentMin) {
      query["price.amount"] = { $gte: request.rentMin };
    }
    if (request.rentMax) {
      query["price.amount"] = {
        ...query["price.amount"],
        $lte: request.rentMax,
      };
    }
    return query;
  }

  private buildSizeQuery(request?: GetApartmentRequest): SizeQuery {
    if (!request) {
      return {};
    }

    const query: SizeQuery = {};
    if (request.sizeMin) {
      query["size.amount"] = { $gte: request.sizeMin };
    }
    if (request.sizeMax) {
      query["size.amount"] = { ...query["size.amount"], $lte: request.sizeMax };
    }

    return query;
  }
}
