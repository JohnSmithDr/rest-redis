'use strict';

let redisManager = require('../services/redis-manager');
let errors = require('../errors');

module.exports = function mwGetRedisClient(req, res, next) {
  let connId = req.header('x-connection-id');
  if (!connId) next(errors.RequireConnectionId());
  req._redisClient = redisManager.get(connId);
  if (!connId) next(errors.ConnectionNotFound());
  next();
};
