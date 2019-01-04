declare module 'ajv' {
  declare export class ValidationError extends Error {
    errors: Array<Object>;
    constructor(errors: Array<Object>): void
  }

  declare export default class Ajv {
    errors: Array<Object>;
    constructor(): void;
    addSchema: (schema: Object) => void;
    validate: (schema: string | Object, object: Object) => boolean;
  }
}
