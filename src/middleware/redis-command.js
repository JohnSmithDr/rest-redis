'use strict';

let debug = require('../debug');

/**
 * @param {string|Function} command
 * @param {Array|Function} [args]
 * @returns {Function}
 */
module.exports = function mwRedisCommand(command, args) {
  return function (req, res, next) {
    let cmd = (typeof command === 'function') ? command(req) : command;
    let args = (typeof args === 'function') ? args(req) : args || [];
     req._redisClient[cmd.toLowerCase()](args, (err, resp) => {
      if (err) return next(err);
      debug.log(resp);
      res._redisResponse(resp);
    });
  }
};