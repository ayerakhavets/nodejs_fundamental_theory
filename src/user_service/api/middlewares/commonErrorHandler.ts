import { logger } from '../../services/logger';
import { INTERNAL_SERVER_ERROR } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function commonErrorHandler(err, req, res, next) {
  const message = err.message || 'Unknown error';
  const stack = err.stack || '';
  const logMeta = Object.assign({}, req.meta || {}, { error: message, stack: stack });

  logger.error(logMeta);
  res.status(500).send({ error: INTERNAL_SERVER_ERROR });
}
