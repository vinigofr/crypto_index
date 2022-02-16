const URL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
const axios = require('axios');

const getBtcCurrency = async () => {
  const response = await axios.get(URL);
  return response;
};

module.exports = {
  getBtcCurrency,
};
