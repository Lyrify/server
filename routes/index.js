const router = require('express').Router();
const musicRoute = require('./music');
const userRoute = require('./user');
const translateRouter = require('./translateRoute.js');

router.use('/user', userRoute);
router.use('/music', musicRoute);
router.use('/translate', translateRouter);

module.exports = router;
