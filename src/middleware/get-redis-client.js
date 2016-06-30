'use strict';

let redisManager = require('../services/redis-manager');
let errors = require('../errors');

module.exports = function mwGetRedisClient(req, res, next) {
  let connId = req.header('x-connection-id');
  if (!connId) next(errors.RequireConnectionId());
  let client = redisManager.get(connId);
  if (!client) next(errors.ConnectionNotFound());
  req._redisClient = client;
  next();
};
