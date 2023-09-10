const CustomError = require('./custom-error');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401; // Unauthorized Request Status Code
  }
}

module.exports = UnauthorizedError