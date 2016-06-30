'use strict';

let debug = require('../debug');

module.exports = function mwErrorResponse(err, req, res, next) {
  debug.error(err);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message });
};
