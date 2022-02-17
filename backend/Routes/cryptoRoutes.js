const router = require('express').Router();

const cryptoController = require('../controllers/cryptoController');

router.get('/', cryptoController.getBtcCurrency);

module.exports = router;
