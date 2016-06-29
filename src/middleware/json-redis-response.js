'use strict';

module.exports = function mwJsonRedisResponse(req, res, next) {
  res._jsonRedisResponse = (resp) => res.status(200).json({ resp });
  next();
};

