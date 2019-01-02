// @flow
import express from 'express';
import type { $Application } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import {
  errorHandler, notFound, requestLogger, errorLogger,
} from './middlewares';

class App {
  express: $Application;

  constructor() {
    this.express = express();
    this.express.use(requestLogger);
    this.express.use(bodyParser.json());
    this.express.use(routes);
    this.express.use(notFound);
    this.express.use(errorLogger);
    this.express.use(errorHandler);
  }
}

export default new App().express;
