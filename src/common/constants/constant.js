module.exports = {
  JWT_SECRET_KEY: process.env.JWT_SECRET,
  JWT_LOGIN_TOKEN_EXP: '60d',
  TOKEN_EXP_MS: 30 * 60 * 60 * 1000,
  SIGN_IN_TYPE: {
    EMAIL_PASSWORD: 'email_password',
    GOOGLE: 'google',
  },
  TOKEN_TYPE: {
    VERIFY_EMAIL: 'verify_email',
    RESET_PASSWORD: 'reset_password',
  },
};
