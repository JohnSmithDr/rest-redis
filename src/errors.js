'use strict';

const ERRORS = {
  RequireConnectionId: [ 400, 'REQUIRE CONNECTION ID' ],
  ConnectionNotFound: [ 404, 'CONNECTION NOT FOUND' ]
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

module.exports.RequireConnectionId = () => RestError.create(ERRORS.RequireConnectionId);
module.exports.ConnectionNotFound = () => RestError.create(ERRORS.ConnectionNotFound);

