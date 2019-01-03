// @flow
import app from './app';
import logger from './utils/logger';

(async () => {
  await logger.init();
  app.listen(3000);
})();
