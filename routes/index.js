const router = require('express').Router();
const musicRoute = require('./music');
const userRoute = require('./user');

router.use('/user', userRoute);
router.use('/music', musicRoute);

module.exports = router;
