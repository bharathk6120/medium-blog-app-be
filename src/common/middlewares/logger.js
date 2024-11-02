/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const LoggerMiddleware = (req, res, next) => {
  const logger = req.ctx.logger;

  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  logger.info(`LoggerMiddleware | Request | ${JSON.stringify(request)}`);

  const resJson = res.json;
  res.json = body => {
    const response = {
      statusCode: res.statusCode,
      body: body,
    };
    logger.info(`LoggerMiddleware | Response | ${JSON.stringify(response)}`);

    resJson.call(res, body);
  };

  next();
};

module.exports = {
  LoggerMiddleware,
};
