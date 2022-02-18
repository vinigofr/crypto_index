const router = require('express').Router();

const cryptoController = require('../controllers/cryptoController');
const {
  verifyCurrencyValue,
  verifyAllowedCurrency,
} = require('../middlewares/cryptoValidation');

router.get('/', cryptoController.getBtcCurrency);
router.post('/', verifyAllowedCurrency, verifyCurrencyValue, cryptoController.updateCurrency);
module.exports = router;
