const { getCurrency } = require('../api/fetchBtcCurrency');
const { getCompleteCurrencyData } = require('../utils/getCompleteCurrencyData');

const getBtcCurrency = async () => {
  const responseFromApi = await getCurrency();
  return getCompleteCurrencyData(responseFromApi);
};

module.exports = {
  getBtcCurrency,
};
