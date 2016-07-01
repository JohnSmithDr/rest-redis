'use strict';

let tv4 = require('tv4');

module.exports = function mwBodyValidator(schema) {
  return function (req, res, next) {
    let r = tv4.validateResult(req.body, schema);
    if (r.error) r.error.statusCode = 400;
    return (r.valid) ? next() : next(r.error);
  };
};
