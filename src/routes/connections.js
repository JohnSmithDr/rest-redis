'use strict';

let router = require('express').router();
let redisClientFromSession = require('../middleware/redis-client-from-session');

/**
 * Create redis connection and return session id.
 */
router.post('/', (req, res, next) => {

  let { host, port, auth } = req.body;


});

/**
 * Quit redis client and destroy connection.
 */
router.delete('/', redisClientFromSession, (req, res, next) => {

});


module.exports = router;
