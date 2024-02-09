import { Document } from 'mongoose';

export interface Location extends Document {
  address: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
  updatedAt: Date;
}
