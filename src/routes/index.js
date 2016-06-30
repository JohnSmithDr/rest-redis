'use strict';

let router = require('express').Router();

router.use(require('../middleware/json-redis-response'));
router.use(require('../middleware/async-process'));

router.use('/connections', require('./connections'));

// handle error
router.use(require('../middleware/error-response'));

module.exports = router;
