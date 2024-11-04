const bcrypt = require('bcrypt');

const { userRepository } = require('@repositories');
const { HttpException } = require('@utils');
const { HttpStatus, CONTANTS } = require('@constants');
const { commonUtils } = require('@utils');

const signUp = async (ctx, signInData) => {
  const logger = ctx.logger.child('AuthService | signUp');

  const currentUser = await userRepository.getData({ email_id: signInData.emailId }, ['user_id']);
  logger.info(`currentUser | ${JSON.stringify(currentUser)}`);

  if (currentUser) {
    throw new HttpException(HttpStatus.CONFLICT, 'User already eixts.');
  }

  const passwordHash = await bcrypt.hash(signInData.password, 10);
  const userId = commonUtils.genRandString(12);

  await userRepository.createdData({
    email_id: signInData.emailId,
    user_id: userId,
    password_hash: passwordHash,
    singn_in_type: CONTANTS.SIGN_IN_TYPE.EMAIL_PASSWORD,
  });

  return { messange: 'Signup success.' };
};

module.exports = {
  signUp,
};
