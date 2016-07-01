'use strict';

let router = require('express').Router();
let redisCommand = require('../middleware/redis-command');

router.use(require('../middleware/redis-client'));

/**
 * @route POST /command
 * @summary Execute a redis command.
 */
router.post('/', redisCommand(req => req.body.command, req => req.body.args));

router.post('/:command', redisCommand(req => req.params.command, req => req.body.args));

module.exports = router;
