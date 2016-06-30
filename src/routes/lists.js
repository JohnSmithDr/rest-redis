'use strict';

let router = require('express').Router();
let getRedisClient = require('../middleware/get-redis-client');
let proxyCommand = require('../middleware/proxy-command');
let queryInteger = require('../middleware/query-integer');
let utils = require('./utils');

router.use(getRedisClient);

/**
 * @route PUT /lists/:key
 * @command LPUSH/RPUSH key value [value ...]
 * @params mode - prepend, append
 * @summary Put elements into a list.
 */
router.put('/:key', proxyCommand(
  (req) => utils.switch(req.body.mode, { prepend: 'LPUSH', append: 'RPUSH' }),
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
 * @route GET /lists/:key?index=
 * @command LINDEX key index
 * @summary Get all the elements in the list. If index is specific in query, then get element from list by index.
 */
router.get('/:key', queryInteger(['index']), proxyCommand(
  (req) => req.query.hasOwnProperty('index') ? 'LINDEX' : 'LRANGE',
  (req) => req.query.hasOwnProperty('index') ? [req.params.key, req.query.index] : [req.params.key, 0, -1]
));

/**
 * @route GET /lists/:key/length
 * @command LLEN key
 * @summary Get the length of a list.
 */
router.get('/:key/length', proxyCommand('LLEN', utils.keyFromPath));

/**
 * @route GET /lists/:key/range
 * @command LRANGE key
 * @summary Get a range of element from list.
 */
router.get('/:key/ranger',
  queryInteger(['start', 'stop']),
  (req) => [req.params.key, req.query.start || 0, req.query.stop || 0]
);

//TODO: LREM
//TODO: LTRIM

module.exports = router;
