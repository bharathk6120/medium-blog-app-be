const { HttpStatus } = require("@constants");
const { createBlogService, fetchAllBlogService } = require("./blog.service");

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

async function fetch(req, res, next) {
  const { logger, user } = req.ctx;
  try {
    const { params } = req;
    const { user_id } = user;
    const { blog_id } = params;

    const blogs = (await fetchAllBlogService(user_id, blog_id, logger)) || [];
    if (blogs.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    res.json({ message: "Success", blogs });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, fetch };
