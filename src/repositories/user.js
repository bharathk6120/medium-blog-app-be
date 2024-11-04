const { user } = require('@models');

const getData = (condition, attributes) => {
  return user.findOne({
    where: condition,
    attributes: attributes,
    raw: true,
  });
};

const createdData = data => {
  return user.create(data);
};

const updatedData = (data, condition) => {
  return user.update(data, {
    where: condition,
  });
};

module.exports = {
  getData,
  createdData,
  updatedData,
};
