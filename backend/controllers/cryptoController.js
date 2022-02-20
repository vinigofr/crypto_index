const cryptoService = require('../service/cryptoService');

const getBtcCurrency = async (req, res) => {
  const currencyResponse = await cryptoService.getBtcCurrency();
  return res.status(200).json(currencyResponse);
};

const updateCurrency = async (req, res) => {
  const { currency, value } = req.body;
  const response = await cryptoService.updateCurrency({ currency, value: Number(value) });
  return res.status(200).send(response);
};

const getBaseCurrencies = async (req, res) => {
  const baseCurrencies = await cryptoService.getBaseCurrencies();
  return res.status(200).json(baseCurrencies);
};

module.exports = {
  getBtcCurrency,
  updateCurrency,
  getBaseCurrencies,
};
