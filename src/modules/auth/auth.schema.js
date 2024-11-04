const joi = require('joi');

const signUpSchema = joi.object({
  emailId: joi.string().required().email(),
  password: joi.string().required().min(5).max(20),
  name: joi.string().required().min(2).max(30),
});

const signInSchema = joi.object({
  emailId: joi.string().required().email(),
  password: joi.string().required().min(5).max(20),
});

module.exports = {
  signUpSchema,
  signInSchema,
};
