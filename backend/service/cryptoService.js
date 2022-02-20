const cryptoModel = require('../model/cryptoModel');

const getBtcCurrency = async () => {
  const currencyResponse = await cryptoModel.getBtcCurrency();
  return currencyResponse;
};

const updateCurrency = async (data) => cryptoModel.updateCurrency(data);

const getBaseCurrencies = async () => cryptoModel.getBaseCurrencies();

module.exports = {
  getBtcCurrency,
  updateCurrency,
  getBaseCurrencies,
};
