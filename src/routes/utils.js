'use strict';

let _ = require('lodash');

/**
 * @param req
 * @returns {Array}
 */
module.exports.keyFromPath = (req) => [ req.params.key ];

/**
 * @param req
 * @returns {Array}
 */
module.exports.keysFromQuery = (req) => req.query.keys && req.query.keys.split(',') || [];

/**
 * @param req
 * @returns {Array}
 */
module.exports.keyValuesFromData = (req) => _.chain(req.body.data).toPairs().flatten().value();

/**
 * @param req
 * @returns {Array}
 */
module.exports.keyValue = (req) => [ req.params.key, req.body.value ];

/**
 * @param req
 * @returns {Array}
 */
module.exports.keyValues = (req) => [ req.params.key ].concat(req.params.values);

/**
 * @param req
 * @returns {Array}
 */
module.exports.patternFromQuery = (req) => [ req.query['pattern'] || '*' ];

module.exports.switch = (val, cases) => cases[val];
