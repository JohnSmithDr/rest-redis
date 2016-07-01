'use strict';

let debug = require('../debug');
let errors = require('../errors');

/**
 * @param {string|Function} command
 * @param {Array|Function} [args]
 * @returns {Function}
 */
module.exports = function mwRedisCommand(command, args) {
  return function (req, res, next) {
    let cmd = (typeof command === 'function') ? command(req) : command;
    let params = (typeof args === 'function') ? args(req) : args || [];
    cmd = cmd.toLowerCase();
    if (typeof req._redisClient[cmd] !== 'function') return next(errors.InvalidCommand());
    req._redisClient[cmd](params, (err, resp) => {
      if (err) {
        debug.error(err);
        return next(err);
      }
      debug.log(resp);
      res._redisResponse(resp);
    });
  }
};