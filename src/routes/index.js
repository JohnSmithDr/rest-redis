'use strict';

let router = require('express').Router();

router.use(require('../middleware/json-redis-response'));

router.use('/connections', require('./connections'));
router.use('/keys', require('./keys'));
router.use('/strings', require('./strings'));

// handle error
router.use(require('../middleware/error-response'));

module.exports = router;
