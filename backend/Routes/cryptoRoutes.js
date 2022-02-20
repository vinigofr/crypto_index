const router = require('express').Router();

const cryptoController = require('../controllers/cryptoController');
const {
  verifyCurrencyValue,
  verifyAllowedCurrency,
} = require('../middlewares/cryptoValidation');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, cryptoController.getBtcCurrency);
router.post('/', verifyToken, verifyAllowedCurrency, verifyCurrencyValue, cryptoController.updateCurrency);
router.get('/base', verifyToken, cryptoController.getBaseCurrencies);

module.exports = router;
