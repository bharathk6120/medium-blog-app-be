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
  return `${err} | ${err.stack.split('\n').slice(0, 2).join('\n')}`;
};

module.exports = {
  isObject,
  formatErr,
};
