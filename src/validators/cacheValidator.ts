import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

class CacheValidator {
  public updateCache = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const schema = Joi.object({
        value: Joi.string().min(4).required()
      });
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: error.message
        });
      } else {
        next();
      }
    } catch (exp) {
      next(exp);
    }
  };
}

export default CacheValidator;
