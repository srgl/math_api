// @flow
import type { $Request, $Response, NextFunction } from 'express';
import logger from '../utils/logger';

export default function requestLogger(req: $Request, res: $Response, next: NextFunction) {
  const data = {
    method: req.method,
    url: req.originalUrl,
  };
  logger.info('Incoming request', data);
  next();
}
