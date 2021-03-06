import express, { IRouter } from 'express';
import CacheController from '../controllers/cache-controller';
import CacheValidator from '../validators/cacheValidator';

class CacheRoutes {
  private CacheController = new CacheController();
  private router = express.Router();
  private CacheValidator = new CacheValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all cache
    /**
     * @openapi
     * /:
     *   get:
     *     description: Welcome to swagger-jsdoc!
     *     responses:
     *       200:
     *         description: Returns a mysterious string.
     */
    this.router.get('', this.CacheController.getAll);
    //route to delete all cache
    this.router.delete('', this.CacheController.deleteAll);
    //route to update a new cache
    this.router.put(
      '/:key',
      this.CacheValidator.updateCache,
      this.CacheController.updateCache
    );

    //route to get/create a single cache
    this.router.get('/:key', this.CacheController.getCache);

    //route to delete a single cache
    this.router.delete('/:key', this.CacheController.deleteCache);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CacheRoutes;
