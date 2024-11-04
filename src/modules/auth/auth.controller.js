const router = require('express').Router();

const { ReqValidator } = require('@middlewares');
const { HttpStatus } = require('@constants');

const { signUpSchema, signInSchema, verifyEmailTokenSchema, genResetPasswordTokenSchema, resetPasswordBodySchema, resetPasswordQuerySchema } = require('./auth.schema');
const authService = require('./auth.service');

router.post('/signUp', ReqValidator({ source: 'body', schema: signUpSchema }), (req, res, next) => {
  authService.signUp(req.ctx, req.body)
  .then(data => res.status(HttpStatus.CREATED).json(data))
  .catch(err => next(err));
});

router.post('/genVerifyEmailToken', ReqValidator({ source: 'body', schema: signInSchema }), (req, res, next) => {
  authService.genVerifyEmailToken(req.ctx, req.body)
  .then(data => res.status(HttpStatus.CREATED).json(data))
  .catch(err => next(err));
});

router.post('/verifyEmailToken', ReqValidator({ source: 'query', schema: verifyEmailTokenSchema }), (req, res, next) => {
  authService.verifyEmailToken(req.ctx, req.query)
  .then(data => res.json(data))
  .catch(err => next(err));
});

router.post('/genResetPasswordToken', ReqValidator({ source: 'body', schema: genResetPasswordTokenSchema }), (req, res, next) => {
  authService.genResetPasswordToken(req.ctx, req.body)
  .then(data =>res.status(HttpStatus.CREATED).json(data))
  .catch(err => next(err));
});

router.post(
  '/resetPassword',
  ReqValidator({ source: 'body', schema: resetPasswordBodySchema }, { source: 'query', schema: resetPasswordQuerySchema }),
  (req, res, next) => {
    authService.resetPassword(req.ctx, req.body, req.query)
  .then(data =>res.status(HttpStatus.CREATED).json(data))
  .catch(err => next(err));
  },
);

module.exports = router;
