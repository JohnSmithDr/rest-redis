'use strict';

let debug = require('../debug');

/**
 * @param {string} command
 * @param {Function} [getArgs]
 * @returns {Function}
 */
module.exports = function mwProxyCommand(command, getArgs) {
  return function (req, res, next) {
    let args = (typeof getArgs === 'function') ? getArgs(req) : [];
    req._redisClient[command](args, (err, resp) => {
      if (err) return next(err);
      debug.log(resp);
      res._jsonRedisResponse(resp);
    });
  }
};