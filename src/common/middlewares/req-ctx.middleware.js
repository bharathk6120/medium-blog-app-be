const crypto = require('crypto');

const { Logger } = require('../logger/logger');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const ReqCtx = (req, res, next) => {
  const requestId = crypto.randomUUID();
  const routeKey = `${req.method} ${req.path} | ${requestId}`;
  const logger = new Logger(routeKey);

  const ctx = {
    requestId: requestId,
    logger: logger,
    routeKey: routeKey,
    user: {},
  };
  req.ctx = ctx;

  next();
};

module.exports = {
  ReqCtx,
};
