'use strict';

module.exports = function mwErrorResponse(err, req, res, next) {
  res
    .status(err.statusCode || 500)
    .json({
      error_code: err.code,
      error_message: err.message
    });
};
