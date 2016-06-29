'use strict';

let redisManager = require('../services/redis-manager');
let errors = require('../errors');

module.exports = function mwRedisClientFromSession(req, res, next) {
  let token = req.header('x-session-token');
  if (!token) next(errors['RequireSessionToken']());
  req._redisClient = redisManager.get(token);
  if (!token) next(errors['NoConnectionForSession']());
  next();
};
