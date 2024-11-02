const Test = require('../common/models/test');

const getData = () => {
  return Test.findOne({});
};

module.exports = {
  getData,
};
