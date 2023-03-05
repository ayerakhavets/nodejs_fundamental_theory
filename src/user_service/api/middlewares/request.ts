import { logger } from '../../services/logger';

export function trackExecutionTime(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`;
    logger.info(message);
  });

  next();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err, req, res, next) {
  const message = err.message || 'Unknown error';
  const stack = err.stack || '';
  const logMeta = Object.assign({}, req.meta || {}, { error: message, stack: stack });

  logger.error(logMeta);
  res.status(500).send({ error: 'Internal Server Error' });
}