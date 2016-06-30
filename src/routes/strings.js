'use strict';

let _ = require('lodash');
let router = require('express').Router();
let getRedisClient = require('../middleware/get-redis-client');
let proxyCommand = require('../middleware/proxy-command');
let debug = require('../debug');
let utils = require('./utils');

router.use(getRedisClient);

/**
 * @route GET /strings?keys=
 * @command MGET
 * @summary Get the string values of all the given keys.
 */
router.get('/', proxyCommand('MGET', utils.keysFromQuery));

/**
 * @route PUT /strings
 * @command MSET
 * @summary Set multiple keys to multiple values.
 */
router.put('/', proxyCommand('MSET', utils.keyValuesFromData));

/**
 * @route GET /strings/:key
 * @command GET
 * @summary Get the string value of the specific key.
 */
router.get('/:key', proxyCommand('GET', utils.keyFromPath));

/**
 * @route PUT /strings/:key
 * @command SET
 * @summary Set the string value of the specific key.
 */
router.put('/:key', proxyCommand('SET', utils.keyValue));

module.exports = router;
