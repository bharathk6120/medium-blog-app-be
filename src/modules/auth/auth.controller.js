const router = require('express').Router();

const authService = require('./auth.service');

router.get('/test', (req, res, next) => {
  authService.signIn(req.ctx)
  .then(data => res.json(data))
  .catch(err => next(err));
});

module.exports = router;
