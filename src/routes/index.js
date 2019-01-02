// @flow

import express from 'express';
import type { $Request, $Response } from 'express';
import { validateQueryString, validateBody } from '../middlewares';

const router = express.Router();

router.get('/div', validateQueryString('div'), (req: $Request, res: $Response) => {
  const result = parseFloat(req.query.a) / parseFloat(req.query.b);
  res.json({ result });
});

router.post('/sqrt', validateBody('sqrt'), (req: $Request, res: $Response) => {
  const { data } = (req.body: Object);
  const result = data.map(n => Math.sqrt(n));
  res.json({ result });
});

export default router;
