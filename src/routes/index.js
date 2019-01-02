// @flow

import express from 'express';
import type { $Request, $Response } from 'express';
import { validateQueryString } from '../middlewares';

const router = express.Router();

router.get('/div', validateQueryString('div'), (req: $Request, res: $Response) => {
  const result = parseFloat(req.query.a) / parseFloat(req.query.b);
  res.json({ result });
});

export default router;
