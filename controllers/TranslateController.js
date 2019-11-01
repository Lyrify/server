const googleTranslate = require('google-translate')(process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY);

class TranslateController {
  static translate(req, res) {
    googleTranslate.translate(req.body.text, req.body.translateTo, function(err, translation) {
      if(!err) {
        // console.log(translation.translatedText);
        res.status(201).json(translation.translatedText);
      } else {
        console.log('error');
        res.status(500).json(err);
      }
    })
  }

  static detectLanguage(req, res) {
    googleTranslate.detectLanguage(req.body.text, function(err, detections) {
      if(!err) {
        // console.log(detections.language);
        res.status(201).json(detections.language);
      } else {
        console.log('error');
        res.status(500).json(err);
      }
    })
  }
}

module.exports = TranslateController;