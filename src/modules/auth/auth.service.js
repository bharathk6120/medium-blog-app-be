const { userRepository } = require('@repositories');
const { HttpException } = require('@utils');
const { HttpStatus } = require('@constants');

const signIn = async (ctx, signInData) => {
  const data = await userRepository.getData({ email: signInData.email }, ['user_id']);
  if (data) {
    throw new HttpException(HttpStatus.CONFLICT, 'User already eixts.');
  }

  return {
    data: [],
  };
};

module.exports = {
  signIn,
};
