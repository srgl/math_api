// @flow

import type { $Request, $Response, NextFunction } from 'express';

export default function errorHandler(error: Error,
  req: $Request, res: $Response, next: NextFunction) {
  res.status(400);
  res.json({ error });
}
