// @flow

import express from 'express';
import type { $Application, $Request, $Response } from 'express';
import * as bodyParser from 'body-parser';

class App {
  express: $Application;

  constructor() {
    this.express = express();
    this.addMiddlewares();
    this.mountRoutes();
  }

  addMiddlewares(): void {
    this.express.use(bodyParser.json());
  }

  mountRoutes(): void {
    this.express.get('/', (req: $Request, res: $Response) => {
      res.json({
        message: 'Hello World!',
      });
    });
  }
}

export default new App().express;
