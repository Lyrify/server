const dezzerAxios = require('../config/apis/dezzerAPI')

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
}

module.exports = MusicController