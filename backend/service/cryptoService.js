const cryptoModel = require('../model/cryptoModel');

const getBtcCurrency = async () => {
  const currencyResponse = await cryptoModel.getBtcCurrency();
  return currencyResponse;
};

module.exports = {
  getBtcCurrency,
};
