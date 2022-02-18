const cryptoModel = require('../model/cryptoModel');

const getBtcCurrency = async () => {
  const currencyResponse = await cryptoModel.getBtcCurrency();
  return currencyResponse;
};

const updateCurrency = async (data) => cryptoModel.updateCurrency(data);

module.exports = {
  getBtcCurrency,
  updateCurrency,
};
