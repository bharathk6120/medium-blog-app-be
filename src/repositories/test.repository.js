const { Test } = require('../common/models');

const getData = () => {
  return Test.findOne({});
};

module.exports = {
  getData,
};
