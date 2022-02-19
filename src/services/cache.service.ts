import Cache from '../models/cache.model';
import { ICache } from '../interfaces/cache.interface';
import { v4 as uuidv4 } from 'uuid';
import { ICacheRead } from '../interfaces/cache-read.interface';

class CacheService {
  //get all items
  maxSize: number = parseInt(process.env.MAX_COUNT || '100');

  public getAllKeys = async (): Promise<ICache[]> => {
    return Cache.find();
  };

  public checkSize = async (): Promise<boolean> => {
    const toRemove = await Cache.find()
      .skip(this.maxSize)
      .limit(1)
      .sort({ lastUsed: 'desc' });
    if (toRemove.length > 0) {
      await Cache.remove({ lastUsed: { $lte: toRemove[0].lastUsed } });
    }
    return true;
  };

  //create/get item
  public upsertCache = async (
    key: string,
    random: string = uuidv4(),
    forceUpdate = false
  ): Promise<ICacheRead> => {
    const filter = { key: key };
    let update: any = { lastUsed: new Date(), $setOnInsert: { value: random } };
    if (forceUpdate) {
      update = { lastUsed: new Date(), value: random };
    }

    const result = await Cache.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    await this.checkSize();
    return {
      item: result.value,
      new: !result.lastErrorObject.updatedExisting
    };
  };

  //deletes a cache
  public deleteCache = async (key: string): Promise<ICache> => {
    const filter = { key: key };
    return Cache.findOneAndDelete(filter);
  };

  //get a single user
  public deleteAll = async (): Promise<boolean> => {
    await Cache.deleteMany({});
    return true;
  };
}

let current: CacheService = undefined;
export function getCacheInstance(): CacheService {
  if (!current) {
    current = new CacheService();
  }
  return current;
}

export default CacheService;
