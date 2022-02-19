import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import Cache from '../../src/models/cache.model';
import { handleConnection, startDB } from '../test.helper';
import HttpStatus from 'http-status-codes';

describe('User APIs Test', () => {
  before((done) => {
    startDB().then(() => {
      done();
    });
  });

  describe('GET /cache/key', () => {
    before((done) => {
      handleConnection().then(() => {
        done();
      });
    });
    it('should return random', async () => {
      const res = await request(app.getApp()).get('/api/v1/cache/key');
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).length.gt(0);
    });
  });

  describe('GET /cache/key2', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key2',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should return value', async () => {
      const res = await request(app.getApp()).get('/api/v1/cache/key2');
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.equal('value');
    });
  });

  describe('GET /cache', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should return empty array', async () => {
      const res = await request(app.getApp()).get('/api/v1/cache');
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.length).to.be.equal(1);
    });
  });
  describe('DELETE /cache', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should return no content', async () => {
      const res = await request(app.getApp()).delete('/api/v1/cache');
      expect(res.statusCode).to.be.equal(HttpStatus.NO_CONTENT);
    });
  });

  describe('DELETE /cache/key', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should delete', async () => {
      const res = await request(app.getApp()).delete('/api/v1/cache/key');
      expect(res.statusCode).to.be.equal(HttpStatus.OK);
    });
  });
  describe('DELETE /cache/key', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should not delete', async () => {
      const res = await request(app.getApp()).delete('/api/v1/cache/key1');
      expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /cache/key', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should update', async () => {
      const res = await request(app.getApp()).put('/api/v1/cache/key').send({
        value: 'test'
      });
      expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
    });
  });

  describe('PUT /cache/key2', () => {
    before((done) => {
      handleConnection()
        .then(() => {
          return Cache.create({
            key: 'key',
            value: 'value',
            lastUsed: new Date()
          });
        })
        .then(() => {
          done();
        });
    });
    it('should create', async () => {
      const res = await request(app.getApp()).put('/api/v1/cache/key2').send({
        value: 'test'
      });
      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
    });
  });

});
