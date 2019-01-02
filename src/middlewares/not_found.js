// @flow

export class NotFoundError extends Error {
  constructor() {
    super('Not found');
  }
}

export default function notFound() {
  throw new NotFoundError();
}
