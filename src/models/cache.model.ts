import { model, Schema } from 'mongoose';
import { ICache } from '../interfaces/cache.interface';

const cacheSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    lastUsed: {
      type: Date,
      required: true,
      expires: parseInt(process.env.EXPIRE_TIME || '3600')
    }
  },
  {}
);

export default model<ICache>('Cache', cacheSchema);
