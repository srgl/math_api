// @flow
import type { $Request, $Response, NextFunction } from 'express';
import Ajv, { ValidationError } from 'ajv';
import div from '../schemas/div';
import sqrt from '../schemas/sqrt';

const ajv = new Ajv();
ajv.addSchema(div);
ajv.addSchema(sqrt);

function validate(schema: string, object: Object) {
  const valid: boolean = ajv.validate(schema, object);
  if (!valid) throw new ValidationError(ajv.errors);
}

export function validateBody(schema: string) {
  return (req: $Request, res: $Response, next: NextFunction) => {
    validate(schema, req.body);
    next();
  };
}

export function validateQueryString(schema: string) {
  return (req: $Request, res: $Response, next: NextFunction) => {
    validate(schema, req.query);
    next();
  };
}
