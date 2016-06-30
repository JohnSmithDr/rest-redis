'use strict';

let router = require('express').Router();

router.use(require('../middleware/json-redis-response'));

router.use('/connections', require('./connections'));
router.use('/keys', require('./keys'));
router.use('/strings', require('./strings'));
router.use('/lists', require('./lists'));
router.use('/sets', require('./sets'));

// handle error
router.use(require('../middleware/error-response'));

module.exports = router;
