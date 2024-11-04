const jwt = require('jsonwebtoken');

const { CONTANTS } = require('@constants');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {any}
 */
const verifyJwt = (req, res, next) => {
  const skipTokenVerification = CONTANTS.EXCLUDE_JWT_VERFICATION_FOR_ROUTES.find(item => req.path.includes(item));
  if (skipTokenVerification) return next();

  const ctx = req.ctx;
  const [prefix, token] = (req.headers.authorization || '').split(' ');

  if (prefix !== 'Bearer') {
    return res.status(401).json({ message: 'unauthorized.' });
  }

  try {
    const payload = jwt.verify(token, CONTANTS.JWT_SECRET_KEY);
    if (!payload.userId) {
      return res.status(401).json({ message: 'unauthorized.' });
    }

    ctx.user.userId = payload.userId;
    ctx.logger.updateContext(payload.userId);
  } catch (e) {
    return res.status(401).json({ message: 'unauthorized.' });
  }

  next();
};

module.exports = {
  verifyJwt,
};
