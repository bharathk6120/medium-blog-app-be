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

const createOrUpdateData = async (data, condition) => {
  const userData = await getData(condition, ['user_id']);

  if (userData) {
    return user.update(data, {
      where: condition,
    });
  }

  return user.create({ ...data, ...condition });
};

module.exports = {
  getData,
  createdData,
  updatedData,
  createOrUpdateData,
};
