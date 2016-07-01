'use strict';

let redisManager = require('../services/redis-manager');
let errors = require('../errors');

module.exports = function mwRedisClient(req, res, next) {
  let connId = req.header('x-connection-id');
  if (!connId) return next(errors.RequireConnectionId());
  let client = redisManager.get(connId);
  if (!client) return next(errors.ConnectionNotFound());
  req._redisClient = client;
  next();
};
