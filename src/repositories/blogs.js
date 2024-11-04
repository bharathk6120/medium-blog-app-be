const { Blogs } = require("@models");

const createBlog = (data) => {
  return Blogs.create(data);
};

const fetchAllBlog = (condition, attributes) => {
  return Blogs.findAll({
    where: condition,
    attributes: attributes || [],
    raw: true,
  });
};

const fetchBlog = (condition, attributes) => {
  return Blogs.findOne({
    where: condition,
    attributes: attributes || [],
    raw: true,
  });
};

module.exports = {
  createBlog,
  fetchAllBlog,
  fetchBlog,
};
