const router = require('express').Router()
const musicRoute = require('./music')

router.use('/music', musicRoute)

module.exports = router