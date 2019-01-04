// @flow
import type { $Request, $Response, NextFunction } from 'express';

export default function queryStringConverter(
  req: $Request, res: $Response, next: NextFunction,
) {
  const query = {};
  Object.keys(req.query).forEach((key) => {
    const value = req.query[key];
    const parsed = Number(value);
    if (typeof value === 'string' && !Number.isNaN(parsed)) {
      query[key] = parsed;
    }
  });
  req.query = query;
  next();
}
