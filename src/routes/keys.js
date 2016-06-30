'use strict';

let router = require('express').Router();
let getRedisClient = require('../middleware/get-redis-client');
let proxyCommand = require('../middleware/proxy-command');
let utils = require('./utils');

router.use(getRedisClient);

/**
 * @route GET /keys?pattern=
 * @command KEYS pattern
 * @summary Find keys matching the given pattern.
 */
router.get('/', proxyCommand('KEYS', utils.patternFromQuery));

/**
 * @route DELETE /keys
 * @command DEL key, [key ...]
 * @summary Delete keys.
 */
router.delete('/', proxyCommand('DEL', utils.keysFromQuery));

/**
 * @route DELETE /keys/:key
 * @command DEL key
 * @summary Delete a specific key.
 */
router.delete('/:key', proxyCommand('DEL', utils.keyFromPath));

/**
 * @route GET /keys/:key/type
 * @command TYPE
 * @summary Get the type of the value stored at key.
 */
router.get('/:key/type', proxyCommand('TYPE', utils.keyFromPath));

/**
 * @route GET /keys/:key/ttl
 * @command TTL
 * @summary Get the time to live of a key.
 */
router.get('/:key/ttl', proxyCommand('TTL', utils.keyFromPath));

/**
 * @route PATCH /keys/:key/ttl
 * @command EXPIRE
 * @summary Set key's time to live in seconds.
 */
router.patch('/:key/ttl', proxyCommand('EXPIRE', utils.keyValue));

/**
 * @route GET /keys/:key/pttl
 * @command PTTL
 * @summary Get the time to live of a key in milliseconds.
 */
router.get('/:key/pttl', proxyCommand('PTTL', utils.keyFromPath));

/**
 * @route PATCH /keys/:key/pttl
 * @command PEXPIRE
 * @summary Set key's time to live in milliseconds.
 */
router.patch('/:key/pttl', proxyCommand('PEXPIRE', utils.keyValue));

/**
 * @route DELETE /keys/:key/expiration
 * @command PERSIST
 * @summary Remove the expiration from key.
 */
router.delete('/:key/expiration', proxyCommand('PERSIST', utils.keyFromPath));

/**
 * @route PATCH /keys/:key/expiration
 * @command EXPIREAT
 * @summary Set the expiration of key as a UNIX timestamp.
 */
router.patch('/:key/expiration', proxyCommand('EXPIREAT', utils.keyValue));

/**
 * @route PATCH /keys/:key/ms-expiration
 * @command PEXPIREAT
 * @summary Set the expiration of key as a UNIX timestamp specified in milliseconds.
 */
router.patch('/:key/ms-expiration', proxyCommand('PEXPIREAT', utils.keyValue));

module.exports = router;
