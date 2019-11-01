const router = require('express').Router();
const TranslateController = require('../controllers/TranslateController.js');
const { authentication } = require('../middlewares/auth');

router.use(authentication)
router.post('/', TranslateController.translate);
router.post('/detectlanguage', TranslateController.detectLanguage);

module.exports = router;
