'use strict';

let router = require('express').Router();
let getRedisClient = require('../middleware/get-redis-client');
let proxyCommand = require('../middleware/proxy-command');
let utils = require('./utils');

router.use(getRedisClient);

/**
 * @route PUT /sets/:key
 * @command SADD/SREM key member [member ...]
 * @params mode - add, remove
 * @summary Modify elements of a set, add or remove members.
 */
router.put('/:key', proxyCommand(
  (req) => utils.switch(req.body.mode, { add: 'SADD', remove: 'SREM' }),
  utils.keyValues));

/**
 * @route PATCH /lists/:key
 * @command LPUSHX/RPUSHX key value
 * @params mode - prepend, append
 * @summary Put a element into a list, only if the list exists.
 */
router.patch('/:key', proxyCommand(
  (req) => utils.switch(req.body.mode, { prepend: 'LPUSHX', append: 'RPUSHX' }),
  utils.keyValue));

/**
 * @route GET /sets/:key
 * @command SMEMBERS key
 * @summary Get all the members in the set.
 */
router.get('/:key', proxyCommand('SMEMBERS', utils.keyFromPath));

/**
 * @route GET /sets/:key/size
 * @command SCARD key
 * @summary Get the number of members in a set.
 */
router.get('/:key/size', proxyCommand('SCARD', utils.keyFromPath));

module.exports = router;
