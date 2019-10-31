const router = require('express').Router();
const translateRouter = require('./translateRoute.js');

router.use('/translate', translateRouter);

module.exports = router;