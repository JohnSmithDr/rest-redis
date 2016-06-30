'use strict';

let router = require('express').Router();
let redisManager = require('../services/redis-manager');
let getRedisClient = require('../middleware/get-redis-client');
let debug = require('../debug');

/**
 * @route POST /connections
 * @command AUTH
 * @summary Create redis connection and return connection id.
 */
router.post('/', (req, res) => {
  let { host, port, auth } = req.body;
  let r = redisManager.create(host, port, { auth_pass: auth });
  res._jsonRedisResponse(r.id);
});

/**
 * @route DELETE /connections
 * @command QUIT
 * @summary Quit redis client and destroy connection.
 */
router.delete('/', getRedisClient, (req, res) => {
  let id = req.header('x-connection-id');
  let d = redisManager.close(id);
  res._jsonRedisResponse(d);
});


module.exports = router;
