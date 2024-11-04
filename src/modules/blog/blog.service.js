const { createBlog, fetchAllBlog } = require("../../repositories/blogs");
const { createBulkContents, fetchContents } = require("../../repositories/contents");

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

async function fetchAllBlogService(user_id, blog_id, logger) {
  let condition = {
    user_id,
  };
  if (blog_id) {
    condition.id = blog_id;
  }

  let attributes = ["title", "is_published", "id", "created_at"];
  let blogs = await fetchAllBlog(condition, attributes);

  if (blogs) {
    logger.info("Blogs Exist");
    attributes = ["content", "type"];

    for (let blog of blogs) {
      condition = {
        blog_id: blog.id,
      };
      blog.content = await fetchContents(attributes, condition);
    }
  } else {
    logger.info("Blogs Not Exist");
  }
  return blogs;
}

module.exports = {
  createBlogService,
  fetchAllBlogService,
};
