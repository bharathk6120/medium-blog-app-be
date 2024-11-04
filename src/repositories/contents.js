const { Contents } = require("@models");

const createBulkContents = (data) => {
  return Contents.bulkCreate(data);
};

const fetchContents = (attributes, conditions) => {
  return Contents.findAll({
    attributes,
    where: conditions,
    raw: true,
  });
};

module.exports = {
  createBulkContents,
  fetchContents,
};
