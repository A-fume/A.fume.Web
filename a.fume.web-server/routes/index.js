const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/perfume', require('./perfume'));
router.use('/brand', require('./brand'));
router.use('/series', require('./series'));
router.use('/ingredient', require('./ingredient'));

module.exports = router;
