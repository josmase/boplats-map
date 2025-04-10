import { model, Schema } from "mongoose";
import type { Apartment } from "./apartment.ts";

const ApartmentSchema = new Schema<Apartment>(
  {
    link: { type: String, required: true, unique: true },
    imageUrls: { type: [String], required: true },
    areaName: { type: String, required: true },
    price: {
      type: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
      },
    },
    address: { type: String, required: true },
    size: {
      type: {
        amount: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    },
    floor: {
      type: {
        actual: { type: Number, required: true },
        total: { type: Number },
      },
      required: true,
    },
    roomCount: { type: Number },
    publishedAt: { type: Date },
    location: {
      type: Object,
      required: true,
    },
    applicationState: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
      required: true,
    },
  },
  { timestamps: true },
);

export const ApartmentModel = model<Apartment>("Apartment", ApartmentSchema);
