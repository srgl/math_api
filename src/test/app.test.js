// @flow
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Ajv from 'ajv';
import app from '../app';
import logger from '../utils/logger';

chai.use(chaiHttp);
const ajv = new Ajv();
const errorResponse = {
  type: 'object',
  required: ['error'],
  properties: {
    error: { type: 'string' },
  },
};
const divResponse = {
  type: 'object',
  required: ['result'],
  properties: {
    result: { type: 'number' },
  },
};
const sqrtResponse = {
  type: 'object',
  required: ['result'],
  properties: {
    result: { type: 'array', items: { type: 'number' } },
  },
};

describe('Math API', () => {
  before(() => {
    sinon.stub(logger, 'log');
  });
  after(() => {
    logger.log.restore();
  });
  describe('/div', () => {
    it('return correct division result', async () => {
      // $FlowFixMe
      const res = await chai.request(app).get('/div?a=-1&b=2');
      expect(res.status).to.eq(200);
      expect(ajv.validate(divResponse, res.body)).to.eq(true);
      expect(res.body.result).to.eq(-0.5);
    });
    it('do not accept zero as divisor', async () => {
      // $FlowFixMe
      const res = await chai.request(app).get('/div?a=1&b=0');
      expect(res.status).to.eq(400);
      expect(ajv.validate(errorResponse, res.body)).to.eq(true);
      expect(res.body.error).to.eq('validation_error');
    });
  });

  describe('/sqrt', () => {
    it('return correct sqrt result', async () => {
      // $FlowFixMe
      const res = await chai.request(app).post('/sqrt')
        .send({ data: [1, 4, 9] });
      expect(res.status).to.eq(200);
      expect(ajv.validate(sqrtResponse, res.body)).to.eq(true);
      expect(res.body.result).to.deep.equal([1, 2, 3]);
    });
    it('do not accept negative numbers', async () => {
      // $FlowFixMe
      const res = await chai.request(app).post('/sqrt')
        .send({ data: [1, -4, 9] });
      expect(res.status).to.eq(400);
      expect(ajv.validate(errorResponse, res.body)).to.eq(true);
      expect(res.body.error).to.eq('validation_error');
    });
  });
});
