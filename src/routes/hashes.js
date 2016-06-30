'use strict';

let router = require('express').Router();
let getRedisClient = require('../middleware/get-redis-client');
let proxyCommand = require('../middleware/proxy-command');
let queryArray = require('../middleware/query-array');
let utils = require('./utils');

router.use(getRedisClient);

/**
 * @route GET /hashes/:key?fields=
 * @command HGETALL/HMGET key
 * @summary Get all the keys and values in hash.
 */
router.get('/:key', queryArray(['fields']), proxyCommand(
  (req) => req.query.hasOwnProperty('fields') ? 'HGETALL' : 'HMGET',
  (req) => req.query.hasOwnProperty('fields') ? [req.params.key] : [req.params.key].concat(req.query['fields']))
);

/**
 * @route PUT /hashes/:key
 * @command HMSET key
 * @summary Set multiple hash fields to multiple values.
 */
router.put('/:key', proxyCommand('HMSET', utils.keyValuesFromData));

/**
 * @route DELETE /hashes/:key?fields=
 * @command HDEL key field [field ...]
 * @summary Set multiple hash fields to multiple values.
 */
router.delete('/:key',
  queryArray(['fields']),
  proxyCommand('HDEL', (req) => [req.params.key].concat(req.query['fields'])));

/**
 * @route GET /hashes/:key/keys
 * @command HKEYS key
 * @summary Get all the keys in hash.
 */
router.get('/:key/keys', proxyCommand('HKEYS', utils.keyFromPath));

/**
 * @route GET /hashes/:key/values
 * @command HVALS key
 * @summary Get all the values in hash.
 */
router.get('/:key/values', proxyCommand('HVALS', utils.keyFromPath));

/**
 * @route GET /hashes/:key/size
 * @command HLEN key
 * @summary Get the number of fields in hash.
 */
router.get('/:key/size', proxyCommand('HLEN', utils.keyFromPath));

/**
 * @route GET /hashes/:key/size
 * @command HLEN key
 * @summary Get the number of fields in hash.
 */
router.get('/:key/size', proxyCommand('HLEN', utils.keyFromPath));

/**
 * @route GET /hashes/:key/field/:field
 * @command HGET key
 * @summary Get the number of fields in hash.
 */
router.get('/:key/fields/:field', proxyCommand('HGET', (req) => [req.params.key, req.params.field]));

/**
 * @route GET /hashes/:key/field/:field/length
 * @command HSTRLEN key field
 * @summary Get the number of fields in hash.
 */
router.get('/:key/fields/:field/length', proxyCommand('HSTRLEN', (req) => [req.params.key, req.params.field]));

/**
 * @route PUT /hashes/:key/field/:field
 * @command HSET key field value
 * @summary Set the value of a hash field.
 */
router.put('/:key/fields/:field', proxyCommand('HSET', (req) => [req.params.key, req.params.field, req.body.value]));

/**
 * @route POST /hashes/:key/field/:field
 * @command HSETNX key field value
 * @summary Set the value of a hash field, only if the field dose not exist.
 */
router.post('/:key/fields/:field', proxyCommand('HSETNX', (req) => [req.params.key, req.params.field, req.body.value]));

module.exports = router;
