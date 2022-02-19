import { expect } from 'chai';
import CacheService from '../../src/services/cache.service';
import Cache from '../../src/models/cache.model';
import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { handleConnection, startDB } from '../test.helper';

dotenv.config();

describe('User', () => {
  before((done) => {
    startDB().then(() => {
      done();
    });
  });
  describe('Get Keys empty', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should return empty array', async () => {
      const cacheService = new CacheService();
      const result = await cacheService.getAllKeys();
      expect(result).to.be.an('array');
    });
  });

  describe('Get Key not empty', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should return array with size 1', async () => {
      const cacheService = new CacheService();
      await cacheService.upsertCache('salam');
      const result = await cacheService.getAllKeys();
      expect(result).to.be.an('array');
      expect(result).to.has.length(1);
    });
  });
  describe('Get item not existing', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should create new item', async () => {
      const cacheService = new CacheService();
      const result = await cacheService.upsertCache('key', 'value');
      expect(result.new).to.be.equal(true);
      expect(result.item.value).to.be.equal('value');
      expect(result.item.key).to.be.equal('key');
      expect(result.item.lastUsed).not.be.null;
    });
  });

  describe('Get item existing', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should not create new item', async () => {
      const cacheService = new CacheService();
      const item = { key: 'key', value: 'value', lastUsed: new Date() };
      await Cache.create(item);
      const result = await cacheService.upsertCache('key', 'value2');

      expect(result.new).to.be.equal(false);
      expect(result.item.value).to.be.equal('value');
      expect(result.item.key).to.be.equal('key');
      expect(result.item.lastUsed).not.be.equal(item.lastUsed);
    });
  });

  describe('Get item existing', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should check the size', async () => {
      const cacheService = new CacheService();
      cacheService.maxSize = 2;
      const item = {
        key: 'key',
        value: 'value',
        lastUsed: new Date('2022-01-02')
      };
      const item2 = {
        key: 'key2',
        value: 'value2',
        lastUsed: new Date('2022-01-03')
      };
      await Cache.create(item);
      await Cache.create(item2);
      await cacheService.upsertCache('key3', 'value3');
      const result = await Cache.find();
      console.log('test' + result.length);
      expect(result.length).to.be.equal(2);
    });
  });

  describe('delete cache', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should delete item', async () => {
      const cacheService = new CacheService();
      const item = { key: 'key', value: 'value', lastUsed: new Date() };
      await Cache.create(item);
      await cacheService.deleteCache('key');
      const result = await Cache.find();
      expect(result.length).to.be.equal(0);
    });
  });
  describe('delete cache not existing', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should not delete item', async () => {
      const cacheService = new CacheService();
      const item = { key: 'key', value: 'value', lastUsed: new Date() };
      await Cache.create(item);
      await cacheService.deleteCache('key2');
      const result = await Cache.find();
      expect(result.length).to.be.equal(1);
    });
  });
  describe('delete all', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should not delete item', async () => {
      const cacheService = new CacheService();
      const item = { key: 'key', value: 'value', lastUsed: new Date() };
      const item2 = { key: 'key2', value: 'value', lastUsed: new Date() };
      await Cache.create(item);
      await Cache.create(item2);
      await cacheService.deleteAll();
      const result = await Cache.find();
      expect(result.length).to.be.equal(0);
    });
  });
});
