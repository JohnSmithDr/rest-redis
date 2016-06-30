'use strict';

let router = require('express').Router();
let keysFromQuery = require('../middleware/keys-from-query');
let getRedisClient = require('../middleware/get-redis-client');

router.use(getRedisClient);

/**
 * @route GET /keys?pattern=
 * @command KEYS pattern
 * @summary Find keys matching the given pattern.
 */
router.get('/', (req, res, next) => {
  res._async(next, () => req._redisClient.keysAsync(req.query.pattern || '*'));
});

/**
 * @route DELETE /keys
 * @command DEL key, [key ...]
 * @summary Delete keys.
 */
router.delete('/', keysFromQuery, (req, res, next) => {

});

/**
 * @route DELETE /keys/:key
 * @command DEL key
 * @summary Delete a specific key.
 */
router.delete('/:key', (req, res, next) => {

});

/**
 * @route GET /keys/:key/type
 * @command TYPE
 * @summary Get the type of the value stored at key.
 */
router.get('/:key/type', (req, res, next) => {

});

/**
 * @route GET /keys/:key/ttl
 * @command TTL
 * @summary Get the time to live of a key.
 */
router.get('/:key/ttl', (req, res, next) => {

});

/**
 * @route PATCH /keys/:key/ttl
 * @command EXPIRE
 * @summary Set key's time to live in seconds.
 */
router.patch('/:key/ttl', (req, res, next) => {

});

/**
 * @route GET /keys/:key/pttl
 * @command PTTL
 * @summary Get the time to live of a key in milliseconds.
 */
router.get('/:key/pttl', (req, res, next) => {

});

/**
 * @route PATCH /keys/:key/pttl
 * @command PEXPIRE
 * @summary Set key's time to live in milliseconds.
 */
router.patch('/:key/pttl', (req, res, next) => {

});

/**
 * @route DELETE /keys/:key/expiration
 * @command PERSIST
 * @summary Remove the expiration from key.
 */
router.delete('/:key/expiration', (req, res, next) => {

});

/**
 * @route PATCH /keys/:key/expiration
 * @command EXPIREAT
 * @summary Set the expiration of key as a UNIX timestamp.
 */
router.patch('/:key/expiration', (req, res, next) => {

});

/**
 * @route PATCH /keys/:key/p-expiration
 * @command PEXPIREAT
 * @summary Set the expiration of key as a UNIX timestamp specified in milliseconds.
 */
router.patch('/:key/p-expiration', (req, res, next) => {

});

/**
 * @route POST /random
 * @command RANDOMKEY
 * @returns Create a random key.
 */
router.post('/random', (req, res, next) => {
  res._async(next, () => req._redisClient.randomkeyAsync());
});

module.exports = router;
