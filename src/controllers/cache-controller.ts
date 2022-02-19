/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { getCacheInstance } from '../services/cache.service';

import { NextFunction, Request, Response } from 'express';

class CacheController {
  public CacheService = getCacheInstance();

  /**
   * Controller to get all keys available
   * @param req
   * @param res
   * @param next
   */
  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CacheService.getAllKeys();
      const result = data.map((item) => {
        return item.key;
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create/get a cache
   * @param req
   * @param res
   * @param next
   */
  public getCache = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CacheService.upsertCache(req.params.key);
      if (data.new) {
        console.log('Cache miss');
      } else {
        console.log('Cache hit');
      }
      res.status(HttpStatus.OK).json(data.item.value);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete all items
   * @param req
   * @param res
   * @param next
   */
  public deleteAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.CacheService.deleteAll();
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a cache
   * @param req
   * @param res
   * @param next
   */
  public updateCache = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CacheService.upsertCache(
        req.params.key,
        req.body.value,
        true
      );
      if (data.new) {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data.item,
          message: 'Cache created successfully'
        });
      } else {
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data.item,
          message: 'Cache changed successfully'
        });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single cache
   * @param req
   * @param res
   * @param next
   */
  public deleteCache = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const item = await this.CacheService.deleteCache(req.params.key);
      if (item) {
        res.status(HttpStatus.OK).json(item);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'Ooops, route not found'
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CacheController;
