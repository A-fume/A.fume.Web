const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/perfume', require('./perfume'));

module.exports = router;
