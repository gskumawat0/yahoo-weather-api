const router = require('express').Router({ mergeParams: true });
const infoController = require('../controllers/info');

router.route('/').post(infoController.getWeatherInfo);
module.exports = router;
