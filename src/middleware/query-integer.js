'use strict';

/**
 * @param {Array} fields
 * @returns {Function}
 */
module.exports = function mwQueryInteger(fields) {
  return function (req, res, next) {
    fields.forEach(field => {
      if (req.query.hasOwnProperty(field))
        req.query[field] = Number.parseInt(req.query[field]);
    });
    next();
  }
};