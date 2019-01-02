// @flow

import type { $Request, $Response, NextFunction } from 'express';
import Ajv, { ValidationError } from 'ajv';
import div from '../schemas/div';
import sqrt from '../schemas/sqrt';

const ajv = new Ajv();
ajv.addSchema(div);
ajv.addSchema(sqrt);

export function validateBody(schema: string) {
  return (req: $Request, res: $Response, next: NextFunction) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) throw new ValidationError(ajv.errors);
    return next();
  };
}

export function validateQueryString(schema: string) {
  return (req: $Request, res: $Response, next: NextFunction) => {
    const data = { ...req.query };
    Object.keys(data).forEach((key) => {
      const num = parseFloat(data[key]);
      if (!Number.isNaN(num)) data[key] = num;
    });
    const valid = ajv.validate(schema, data);
    if (!valid) throw new ValidationError(ajv.errors);
    return next();
  };
}
