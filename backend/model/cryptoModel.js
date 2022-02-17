const fetchBtcCurrency = require('../api/fetchBtcCurrency');

const getBtcCurrency = async () => {
  const responseFromApi = await fetchBtcCurrency.getCurrency();
  return responseFromApi;
};

module.exports = {
  getBtcCurrency,
};
