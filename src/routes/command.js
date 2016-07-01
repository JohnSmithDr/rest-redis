'use strict';

let router = require('express').Router();
let redisCommand = require('../middleware/redis-command');
let bodyValidator = require('../middleware/body-validator');

router.use(require('../middleware/redis-client'));

/**
 * @route POST /command
 * @summary Execute a redis command.
 */
router.post('/',
  bodyValidator({
    properties: {
      command: { type: 'string' },
      args: { type: 'array' }
    },
    required: ['command', 'args']
  }),
  redisCommand(req => req.body.command, req => req.body.args));

router.post('/:command',
  bodyValidator({
    properties: {
      args: { type: 'array' }
    },
    required: ['args']
  }),
  redisCommand(req => req.params.command, req => req.body.args));

module.exports = router;
