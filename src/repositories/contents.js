const { Contents } = require("@models");

const createBulkContents = (data) => {
  return Contents.bulkCreate(data);
};

module.exports = {
  createBulkContents,
};
