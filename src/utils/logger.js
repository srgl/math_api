// @flow
import winston from 'winston';

class Logger {
  logger: $winstonLogger<$winstonNpmLogLevels>

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

  info(message: string, data: Object) {
    this.logger.info(message, { data });
  }

  error(message: string, data: Object) {
    this.logger.error(message, { data });
  }
}

export default new Logger();
