const router = require('express').Router();

const { ReqValidator } = require('@middlewares');
const { signUpSchema } = require('./auth.schema');
const authService = require('./auth.service');

router.post('/signIn', ReqValidator({ source: 'body', schema: signUpSchema }), (req, res, next) => {
  authService.signUp(req.ctx, req.body)
  .then(data => res.json(data))
  .catch(err => next(err));
});

module.exports = router;
