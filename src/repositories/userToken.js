const { userToken } = require('@models');

const getData = (condition, attributes) => {
  return userToken.findOne({
    where: condition,
    attributes: attributes,
    raw: true,
  });
};

const createdData = data => {
  return userToken.create(data);
};

const updatedData = (data, condition) => {
  return userToken.update(data, {
    where: condition,
  });
};

const createOrUpdateData = async (data, condition) => {
  const userTokenData = await getData(condition, ['user_id']);

  if (userTokenData) {
    return userToken.update(data, {
      where: condition,
    });
  }

  return userToken.create({ ...data, ...condition });
};

module.exports = {
  getData,
  createdData,
  updatedData,
  createOrUpdateData,
};
