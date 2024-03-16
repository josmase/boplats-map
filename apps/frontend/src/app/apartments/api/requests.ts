export interface GetApartmentRequest {
  dateStart?: Date;
  dateEnd?: Date;
  roomsMin?: number;
  roomsMax?: number;
  rentMin?: number;
  rentMax?: number;
  sizeMin?: number;
  sizeMax?: number;
}
