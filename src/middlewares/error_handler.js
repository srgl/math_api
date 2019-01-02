// @flow

import type { $Request, $Response, NextFunction } from 'express';
import { ValidationError } from 'ajv';
import { NotFoundError } from './not_found';

export default function errorHandler(error: Error,
  req: $Request, res: $Response, next: NextFunction) {
  if (error instanceof NotFoundError) {
    res.status(404);
    res.json({ error: 'not_found' });
  } else if (error instanceof ValidationError) {
    const validationError = (error: ValidationError);
    res.status(400);
    res.json({ error: 'validation_failed', details: validationError.errors });
  } else {
    res.status(500);
    res.json({ error: 'internal_error' });
  }
}
