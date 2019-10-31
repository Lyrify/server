const router = require('express').Router();
const TranslateController = require('../controllers/TranslateController.js');
const JWT = require('../middlewares/JWT.js');

router.get('/', JWT.authentication, JWT.authorization, TranslateController.translate);
router.get('/detectlanguage', JWT.authentication, JWT.authorization, TranslateController.detectLanguage);

module.exports = router;