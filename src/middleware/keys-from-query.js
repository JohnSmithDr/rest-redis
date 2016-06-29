'use strict';

module.exports = function mwKeysFromQuery(req, res, next) {
  let { keys } = req.query;
  if (keys) {
    let params = req._redisParams || {};
    params.keys = keys.split(',');
    req._redisParams = params;
  }
  next();
};
