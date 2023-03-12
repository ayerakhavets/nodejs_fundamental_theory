import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services/logger';
import config from '../../config';

export async function checkAuthentication(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      res.sendStatus(401);
      return;
    }

    try {
      await jwt.verify(req.headers.authorization, config.jwtSecret);
      next();
    } catch (error) {
      logger.error(error);
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
}
