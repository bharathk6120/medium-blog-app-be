const Joi = require("joi");

const createBlogSchema = {
  source: "body",
  schema: Joi.object({
    title: Joi.string().required(),
    is_published: Joi.boolean(),
    category: Joi.string().required(),
    contents: Joi.array().items(
      Joi.object({
        type: Joi.string().required(),
        content: Joi.string().required(),
      })
    ),
  }),
};

const fetchBlogSchema = {
  source: "body",
  schema: Joi.object({
    blog_id: Joi.number().required(),
  }),
};

module.exports = {
  createBlogSchema,
  fetchBlogSchema,
};
