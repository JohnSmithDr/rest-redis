'use strict';

let router = require('express').Router();

router.use(require('../middleware/redis-response'));

router.use('/command', require('./command'));
router.use('/connections', require('./connections'));

// handle error
router.use(require('../middleware/error-response'));

module.exports = router;
