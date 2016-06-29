'use strict';

let router = require('express').router();
let keysFromQuery = require('../middleware/keys-from-query');
let redisClientFromSession = require('../middleware/redis-client-from-session');

router.use(redisClientFromSession);

/**
 * Delete keys.
 */
router.delete('/', keysFromQuery, (req, res, next) => {

});

/**
 * Delete a specific key.
 */
router.delete('/:key', (req, res, next) => {

});


module.exports = router;
