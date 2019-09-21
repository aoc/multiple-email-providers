import { Express } from 'express';
import winston from 'winston';
import config, { Env } from './config';
import morgan from 'morgan';

const morganFormat =
  ':method :url :status :response-time ms - :res[content-length] \nRequest:\n:reqBody';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ handleExceptions: true, stderrLevels: [] })
  ]
});

/**
 * Adds morgan integration
 *
 * @param app express application
 */
export const initLogger = (app: Express) => {
  const morganOption: morgan.Options = {
    stream: {
      write: (message: string) => {
        logger.debug(message.trim());
      }
    }
  };
  morgan.token('reqBody', req => JSON.stringify(req.body, null, 2));
  app.use(morgan(morganFormat, morganOption));

  logger.level = config.logger.level;
  logger.format =
    config.env === Env.DEV
      ? winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      : winston.format.json();
};

export default logger;
