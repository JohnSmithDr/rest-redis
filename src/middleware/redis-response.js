'use strict';

let debug = require('../debug');

module.exports = function mwRedisResponse(req, res, next) {
  res._redisResponse = (reply) => {
    debug.log('reply:', reply);
    res.status(200).json({ reply });
  };
  next();
};

