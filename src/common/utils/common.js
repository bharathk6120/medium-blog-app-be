const crypto = require('crypto');
const nanoid = require('nanoid');

/**
 *
 * @param {any} val
 * @return {boolean}
 */
const isObject = val => typeof val === 'object' && val !== null;

/**
 *
 * @param {Error} err
 * @return {string}
 */
const formatErr = err => {
  return `${err} | ${err.stack.split('\n').join('\n')}`;
};

/**
 *
 * @param {string} bytes
 * @return {string}
 */
const genRandToken = (bytes = 64) => {
  return crypto.randomBytes(bytes).toString('base64url');
};

/**
 *
 * @param {number} len
 * @return {string}
 */
const genRandString = len => {
  return nanoid(len);
};

/**
 *
 * @param {string} val
 * @return {string}
 */
const createHash = val => {
  return crypto.createHash('sha256').update(val).digest('hex');
};

module.exports = {
  isObject,
  formatErr,
  genRandToken,
  genRandString,
  createHash,
};
