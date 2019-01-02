// @flow

export class NotFoundError extends Error {}

export default function notFound() {
  throw new NotFoundError();
}
