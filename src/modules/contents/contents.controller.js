const { HttpStatus } = require("@constants");
const { fetchContentService } = require("./contents.service");

async function fetch(req, res, next) {
  const { logger } = req.ctx;
  try {
    const { params } = req;
    const { blog_id, content_id } = params;

    const contents = (await fetchContentService(blog_id, content_id, logger)) || [];
    if (contents.length == 0) {
      logger.info("No Content Found");
      res.status(HttpStatus.NO_CONTENT);
    }
    res.json({ message: "Success", contents });
  } catch (error) {
    next(error);
  }
}

module.exports = { fetch };
