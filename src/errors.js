'use strict';

const ERRORS = {
  InvalidCommand: [ 400, 'Invalid command' ],
  RequireConnectionId: [ 400, 'Require connection id' ],
  ConnectionNotFound: [ 404, 'Connection not found' ]
};

class RestError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
  static create(e) {
    return new RestError(e[0], e[1]);
  }
}

module.exports.InvalidCommand = () => RestError.create(ERRORS.InvalidCommand);
module.exports.RequireConnectionId = () => RestError.create(ERRORS.RequireConnectionId);
module.exports.ConnectionNotFound = () => RestError.create(ERRORS.ConnectionNotFound);
