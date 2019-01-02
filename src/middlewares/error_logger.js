// @flow

import type { $Request, $Response, NextFunction } from 'express';
import logger from '../utils/logger';

export default function errorLogger(error: Error,
  req: $Request, res: $Response, next: NextFunction) {
  logger.error('Request failure', error);
  next(error);
}
