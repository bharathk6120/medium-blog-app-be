const { createBlog } = require("../../repositories/blogs");
const { createBulkContents } = require("../../repositories/contents");

async function createBlogService(user_id, data, logger) {
  const { title } = data;
  let contents = data.contents || [];

  const blogResponse = await createBlog({
    title,
    user_id,
  });
  logger.info("Blog Created");

  const { id } = blogResponse;
  contents.forEach((element) => {
    element.user_id = user_id;
    element.blog_id = id;
  });
  await createBulkContents(contents);
  logger.info("Content Created");
}

module.exports = {
  createBlogService,
};
