const Joi = require("joi");

const fetchContentSchema = {
  source: "params",
  schema: Joi.object({
    blog_id: Joi.number().required(),
    content_id: Joi.number(),
  }),
};

module.exports = {
  fetchContentSchema,
};
