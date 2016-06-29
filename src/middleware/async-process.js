'use strict';

module.exports = function mwAsyncProcess(req, res, next) {
  res._async = (next, promise) => {
    promise
      .then(resp => res._jsonRedisResponse(resp))
      .catch(err => next(err));
  };
  next();
};