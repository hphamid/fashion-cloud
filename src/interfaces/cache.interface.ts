import { Document } from 'mongoose';

export interface ICache extends Document {
  _id: string | number;
  key: string;
  value: string;
  lastUsed: Date;
}
