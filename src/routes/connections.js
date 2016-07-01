'use strict';

let router = require('express').Router();
let redisManager = require('../services/redis-manager');
let debug = require('../debug');

/**
 * @route POST /connections
 * @command AUTH
 * @summary Create redis connection and return connection id.
 */
router.post('/', (req, res) => {
  let { host, port, auth } = req.body;
  let r = redisManager.create(host, port, { auth_pass: auth });
  res._redisResponse(r.id);
});

/**
 * @route DELETE /connections
 * @command QUIT
 * @summary Quit redis client and destroy connection.
 */
router.delete('/', require('../middleware/redis-client'), (req, res) => {
  let id = req.header('x-connection-id');
  let d = redisManager.close(id);
  res._redisResponse(d);
});


module.exports = router;
