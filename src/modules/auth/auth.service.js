const { testRepository } = require('../../repositories');
const { HttpException } = require('../../common/utils/http-exception');

const signIn = async ctx => {
  const data = await testRepository.getData();
  if (!data) {
    throw new HttpException(400, 'No data found.');
  }

  return {
    data: data,
  };
};

module.exports = {
  signIn,
};
