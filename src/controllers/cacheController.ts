/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import CacheService from '../services/cache.service';

import { NextFunction, Request, Response } from 'express';

class CacheController {
  public CacheService = new CacheService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
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
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
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
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
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
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
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
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
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
