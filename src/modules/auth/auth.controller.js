const authService = require('./auth.service');

const signIn = (req, res, next) => {
  authService.signIn(req.ctx)
  .then(data => res.json(data))
  .catch(err => next(err));
};

module.exports = {
  signIn,
};
