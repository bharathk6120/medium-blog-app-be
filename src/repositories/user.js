const { User } = require('@models');

const getData = (condition, attributes) => {
  return User.findOne({
    where: condition,
    attributes: attributes,
    raw: true,
  });
};

const createdData = data => {
  return User.create(data);
};

const updatedData = (data, condition) => {
  return User.update(data, {
    where: condition,
  });
};

module.exports = {
  getData,
  createdData,
  updatedData,
};
