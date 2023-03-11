import process from 'node:process';
import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import config from '../config';
import middlewares from '../api/middlewares';
import routes from '../api';
import { logger } from '../services/logger';

export default ({ app }: { app: express.Application }) => {
  // Transforms the raw string of req.body into json
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      expressFormat: true,
      colorize: false,
    }),
  );

  // Load API routes.
  app.use(config.api.prefix, routes());

  app.use(middlewares.commonErrorHandler);

  // Event is emitted whenever a Promise is rejected and no error handler is attached to it.
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });

  // A crude mechanism for exception handling intended to be used only as a last resort
  process.on('uncaughtException', (error) => {
    logger.error(error);
    process.exit(1);
  });

  logger.info('✌️ Express loaded');
};
