const dezzerAxios = require('../config/apis/dezzerAPI')
const lyricsAxios = require('../config/apis/lyricsAPI')

class MusicController {
  static getTopMusics (req, res, next) {
    dezzerAxios({
      method: 'get',
      url: '/chart/0/tracks'
    })
      .then(({data}) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static getTopAlbums (req, res, next) {
    dezzerAxios({
      method: 'get',
      url: '/chart/0/albums'
    })
      .then(({data}) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static getTopArtists (req, res, next) {
    dezzerAxios({
      method: 'get',
      url: '/chart/0/artists'
    })
      .then(({data}) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static getLyric (req, res, next) {
    const { artist, track } = req.query
    lyricsAxios({
      method: 'get',
      url: `/track.search`,
      params: {
        apikey: process.env.MUSIXMATCH_SECRET,
        q_artist: artist,
        q_track: track
      }
    })
      .then(({data}) => {
        const track_id = data.message.body.track_list[0].track.track_id
        return lyricsAxios({
          method: 'get',
          url: `/track.lyrics.get`,
          params: {
            apikey: process.env.MUSIXMATCH_SECRET,
            track_id
          }
        })
      })
      .then(({data}) => {
        res.status(200).json(data.message.body.lyrics)
      })
      .catch(next)

  }
}

module.exports = MusicController