const { fetchContents } = require("../../repositories/contents");

async function fetchContentService(blog_id, content_id, logger) {
  let conditions = {
    blog_id,
  };
  if (content_id) {
    conditions.id = content_id;
  }
  const attributes = ["type", "content", "id"];
  const contents = await fetchContents(attributes, conditions);
  logger.info("Content Recieved");
  return contents;
}

module.exports = {
  fetchContentService,
};
