const joi = require('joi');

const emailId = joi.string().required().email();
const password = joi.string().required().min(5).max(20);
const name = joi.string().required().min(2).max(30);
const token = joi.string().required().min(86).max(86);

const signUpSchema = joi.object({
  emailId: emailId,
  password: password,
  name: name,
});

const signInSchema = joi.object({
  emailId: emailId,
  password: password,
});

const verifyEmailTokenSchema = joi.object({
  token: token,
});

const genResetPasswordTokenSchema = joi.object({
  emailId: emailId,
});

const resetPasswordBodySchema = joi.object({
  password: password,
});

const resetPasswordQuerySchema = joi.object({
  token: token,
});

module.exports = {
  signUpSchema,
  signInSchema,
  genResetPasswordTokenSchema,
  verifyEmailTokenSchema,
  resetPasswordBodySchema,
  resetPasswordQuerySchema,
};
