const router = require('express').Router()
const MusicController = require('../controllers/music')

router.get('/top-musics', MusicController.getTopMusics)
router.get('/top-albums', MusicController.getTopAlbums)
router.get('/top-artists', MusicController.getTopArtists)
router.get('/lyric', MusicController.getLyric)

module.exports = router