const { createBlogService } = require("./blog.service");

async function create(req, res, next) {
  const { logger, user } = req.ctx;
  try {
    const { body } = req;
    const { user_id } = user;

    await createBlogService(user_id, body, logger);

    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
}

module.exports = { create };
