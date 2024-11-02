const authService = require('./auth.service');

const signIn = (req, res, next) => {
  authService.signIn()
  .then(data => res.json(data))
  .catch(err => next(err));
};

module.exports = {
  signIn,
};
