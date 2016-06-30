'use strict';

let debug = require('../debug');

module.exports = function mwJsonRedisResponse(req, res, next) {
  res._jsonRedisResponse = (reply) => {
    debug.log('reply:', reply);
    res.status(200).json({ reply });
  };
  next();
};

