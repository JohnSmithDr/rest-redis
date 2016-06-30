'use strict';

/**
 * @param {Array} fields
 * @returns {Function}
 */
module.exports = function mwQueryArray(fields) {
  return function (req, res, next) {
    fields.forEach(field => {
      if (req.query.hasOwnProperty(field) && req.query[field])
        req.query[field] = req.query[field].split(',');
    });
    next();
  }
};