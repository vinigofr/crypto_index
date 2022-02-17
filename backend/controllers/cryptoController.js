const cryptoService = require('../service/cryptoService');

const getBtcCurrency = async (req, res) => {
  const currencyResponse = await cryptoService.getBtcCurrency();
  return res.status(200).json(currencyResponse);
};

module.exports = {
  getBtcCurrency,
};
