const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userRepository, userTokenRepository, userProfileRepository } = require('@repositories');
const { HttpException } = require('@utils');
const { HttpStatus, CONTANTS } = require('@constants');
const { commonUtils } = require('@utils');

const signUp = async (ctx, signUpData) => {
  const logger = ctx.logger.child('AuthService | signUp');

  const userData = await userRepository.getData({ email_id: signUpData.emailId }, ['user_id']);
  logger.info(`userData | ${JSON.stringify(userData)}`);

  if (userData) {
    throw new HttpException(HttpStatus.CONFLICT, 'User already eixts.');
  }

  const passwordHash = await bcrypt.hash(signUpData.password, 10);
  const userId = commonUtils.genRandString(12);

  await userRepository.createOrUpdateData(
    {
      email_id: signUpData.emailId,
      user_id: userId,
      password_hash: passwordHash,
      singn_in_type: CONTANTS.SIGN_IN_TYPE.EMAIL_PASSWORD,
    },
  { user_id: userId },
);

  await userProfileRepository.createdData({
    user_id: userId,
    name: signUpData.name,
  });

  return { messange: 'Signup success.' };
};

const genVerifyEmailToken = async (ctx, verifyEmailData) => {
  const logger = ctx.logger.child('AuthService | genVerifyEmailToken');

  const userData = await userRepository.getData(
    { email_id: verifyEmailData.emailId, singn_in_type: CONTANTS.SIGN_IN_TYPE.EMAIL_PASSWORD },
    ['user_id', 'password_hash'],
  );
  logger.info(`userData | ${JSON.stringify(userData)}`);

  if (!userData) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid emailId or password.');
  }

  if (!(await bcrypt.compare(verifyEmailData.password, userData.password_hash))) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid emailId or password.');
  }

  const userTokenData = await userTokenRepository.getData(
    { user_id: userData.user_id, type: CONTANTS.TOKEN_TYPE.VERIFY_EMAIL },
    ['expires_at'],
  );

  if (userTokenData && Date.now() < new Date(userTokenData.expires_at).getTime()) {
    throw new HttpException(HttpStatus.FORBIDDEN, 'You will be able to generate new token after ' + userTokenData.expires_at);
  }

  const token = commonUtils.genRandToken();
  const tokenHash = commonUtils.createHash(token);
  const expiresAt = new Date(Date.now() + CONTANTS.TOKEN_EXP_MS);

  await userTokenRepository.createOrUpdateData(
    { token_hash: tokenHash, expires_at: expiresAt },
    { user_id: userData.user_id, type: CONTANTS.TOKEN_TYPE.VERIFY_EMAIL },
  );

  return {
    messsage: 'Verification email sent successfully.',
    token,
  };
};

const verifyEmailToken = async (ctx, verifyEmailData) => {
  const logger = ctx.logger.child('AuthService | verifyEmailToken');

  const tokenHash = commonUtils.createHash(verifyEmailData.token);
  const userTokenData = await userTokenRepository.getData(
  { token_hash: tokenHash, type: CONTANTS.TOKEN_TYPE.VERIFY_EMAIL },
  ['id', 'user_id'],
 );
  logger.info(`userTokenData | ${JSON.stringify(userTokenData)}`);

  if (!userTokenData) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid token.');
  }

  if (Date.now() >= new Date(userTokenData.expires_at).getTime()) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Token has expired.');
  }

  await userRepository.updatedData(
    { email_verfied_at: new Date() },
    { user_id: userTokenData.user_id },
  );

  await userTokenRepository.updatedData(
    { token_hash: null },
    { user_id: userTokenData.user_id, type: CONTANTS.TOKEN_TYPE.VERIFY_EMAIL },
   );

  return {
    message: 'Email verified successfully.',
  };
};

const genResetPasswordToken = async (ctx, verifyEmailData) => {
  const logger = ctx.logger.child('AuthService | genResetPasswordToken');

  const userData = await userRepository.getData(
    { email_id: verifyEmailData.emailId, singn_in_type: CONTANTS.SIGN_IN_TYPE.EMAIL_PASSWORD },
    ['user_id', 'password_hash'],
  );
  logger.info(`userData | ${JSON.stringify(userData)}`);

  if (!userData) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid emailId.');
  }

  const userTokenData = await userTokenRepository.getData(
    { user_id: userData.user_id, type: CONTANTS.TOKEN_TYPE.RESET_PASSWORD },
    ['expires_at'],
  );

  if (userTokenData && (Date.now() < new Date(userTokenData.expires_at).getTime())) {
    throw new HttpException(HttpStatus.FORBIDDEN, 'You will be able to generate new token after ' + userTokenData.expires_at);
  }

  const token = commonUtils.genRandToken();
  const tokenHash = commonUtils.createHash(token);
  const expiresAt = new Date(Date.now() + CONTANTS.TOKEN_EXP_MS);

  await userTokenRepository.createOrUpdateData(
    { token_hash: tokenHash, expires_at: expiresAt },
    { user_id: userData.user_id, type: CONTANTS.TOKEN_TYPE.RESET_PASSWORD },
  );

  return {
    messsage: 'Reset password email sent successfully.',
    token,
  };
};

const resetPassword = async (ctx, resetPasswordbody, resetPasswordQuery) => {
  const logger = ctx.logger.child('AuthService | resetPassword');

  const tokenHash = commonUtils.createHash(resetPasswordQuery.token);
  const userTokenData = await userTokenRepository.getData(
  { token_hash: tokenHash, type: CONTANTS.TOKEN_TYPE.RESET_PASSWORD },
  ['id', 'user_id'],
 );
  logger.info(`userTokenData | ${JSON.stringify(userTokenData)}`);

  if (!userTokenData) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid token.');
  }

  if (Date.now() >= new Date(userTokenData.expires_at).getTime()) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Token has expired.');
  }

  const passwordhash = await bcrypt.hash(resetPasswordbody.password, 10);

  await userRepository.updatedData(
    { password_hash: passwordhash },
    { user_id: userTokenData.user_id },
  );

  await userTokenRepository.updatedData(
    { token_hash: null },
    { user_id: userTokenData.user_id, type: CONTANTS.TOKEN_TYPE.RESET_PASSWORD },
   );

  return {
    message: 'Password changed successfully.',
  };
};

const signIn = async (ctx, signInData) => {
  const logger = ctx.logger.child('AuthService | signIn');

  const userData = await userRepository.getData(
    { email_id: signInData.emailId, singn_in_type: CONTANTS.SIGN_IN_TYPE.EMAIL_PASSWORD },
    ['user_id', 'password_hash'],
  );
  logger.info(`userData | ${JSON.stringify(userData)}`);

  if (!userData) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid emailId or password.');
  }

  if (!(await bcrypt.compare(signInData.password, userData.password_hash))) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Invalid emailId or password.');
  }

  const token = jwt.sign(
    { userId: userData.user_id },
    CONTANTS.JWT_SECRET_KEY,
    { expiresIn: CONTANTS.JWT_LOGIN_TOKEN_EXP },
  );

  return {
    token: token,
  };
};

module.exports = {
  signUp,
  genVerifyEmailToken,
  verifyEmailToken,
  genResetPasswordToken,
  resetPassword,
  signIn,
};
