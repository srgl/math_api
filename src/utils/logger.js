// @flow
import fs from 'fs';
import winston from 'winston';
import PGTransport from './pg_transport';

class Logger {
  logger: $winstonLogger<$winstonNpmLogLevels>

  async init() {
    if (!fs.existsSync('logs')) fs.mkdirSync('logs');
    const pgTransport: PGTransport = new PGTransport();
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

  log(level: $Keys<$winstonNpmLogLevels>, message: string, data: {[string]: any}) {
    const info: $winstonInfo<$winstonNpmLogLevels> = {
      level,
      message,
      data,
    };
    this.logger.log(info);
  }

  info(message: string, data: {[string]: any}) {
    this.log('info', message, data);
  }

  error(message: string, data: {[string]: any}) {
    this.log('error', message, data);
  }
}

export default new Logger();
