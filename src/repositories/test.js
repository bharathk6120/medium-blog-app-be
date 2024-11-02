const { Test } = require('../models');

const getData = () => {
  return Test.findOne({});
};

module.exports = {
  getData,
};
