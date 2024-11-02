/**
 *
 */
class HttpException extends Error {
  /**
   *
   * @param {number} status
   * @param {status} message
   */
  constructor(status, message) {
    super(message);

    this.httpStatusCode = status;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  HttpException,
};
