const Joi = require("joi");

const createBlogSchema = Joi.object({
  title: Joi.string().alphanum().required(),
  contents: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      content: Joi.string().required(),
    })
  ),
});

module.exports = {
  createBlogSchema,
};
