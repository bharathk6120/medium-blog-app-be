const { Blogs } = require("@models");

const createBlog = (data) => {
  return Blogs.create(data);
};

module.exports = {
  createBlog,
};
