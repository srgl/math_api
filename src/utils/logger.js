// @flow
import winston from 'winston';

class Logger {
  logger: any

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({}),
        new winston.transports.File({ filename: 'logs/api.log' }),
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
