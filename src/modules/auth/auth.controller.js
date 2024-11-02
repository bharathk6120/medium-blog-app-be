const router = require('express').Router();

const { ReqValidator } = require('../../common/middlewares/req-validator.middleware');
const authService = require('./auth.service');

const Joi = require('joi');

const schema = Joi.object({
  id: Joi.string().alphanum().min(3).max(30).required(),
});

router.get('/test', ReqValidator({ source: 'query', schema: schema }), (req, res, next) => {
  authService.signIn(req.ctx)
  .then(data => res.json(data))
  .catch(err => next(err));
});

module.exports = router;
