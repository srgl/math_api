// @flow
import fs from 'fs';
import winston from 'winston';
import PGTransport from './pg_transport';

class Logger {
  logger: any

  async init() {
    if (!fs.existsSync('logs')) fs.mkdirSync('logs');
    const pgTransport = new PGTransport();
    await pgTransport.init();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({}),
        new winston.transports.File({ filename: 'logs/api.log' }),
        pgTransport,
      ],
    });
  }

  log(level: string, message: string, data: Object) {
    this.logger.log({ level, message, data });
  }

  info(message: string, data: Object) {
    this.log('info', message, data);
  }

  error(message: string, data: Object) {
    this.log('error', message, data);
  }
}

export default new Logger();
