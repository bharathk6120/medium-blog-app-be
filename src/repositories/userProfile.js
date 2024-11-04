const { userProfile } = require('@models');

const getData = (condition, attributes) => {
  return userProfile.findOne({
    where: condition,
    attributes: attributes,
    raw: true,
  });
};

const createdData = data => {
  return userProfile.create(data);
};

const updatedData = (data, condition) => {
  return userProfile.update(data, {
    where: condition,
  });
};

const createOrUpdateData = async (data, condition) => {
  const userProfileData = await getData(condition, ['user_id']);

  if (userProfileData) {
    return userProfile.update(data, {
      where: condition,
    });
  }

  return userProfile.create({ ...data, ...condition });
};

module.exports = {
  getData,
  createdData,
  updatedData,
  createOrUpdateData,
};
