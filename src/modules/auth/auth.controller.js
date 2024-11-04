const router = require('express').Router();

const authService = require('./auth.service');

router.get('/signIn', (req, res, next) => {
  authService.signIn(req.ctx, req.body)
  .then(data => res.json(data))
  .catch(err => next(err));
});

module.exports = router;
