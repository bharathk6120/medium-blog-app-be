const Joi = require("joi");

const fetchContentSchema = Joi.object({
  blog_id: Joi.number().required(),
});

module.exports = {
  fetchContentSchema,
};
