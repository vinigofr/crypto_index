const axios = require('axios');

const URL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';

const getCurrency = async () => {
  const response = await axios.get(URL);
  return response.data;
};

module.exports = {
  getCurrency,
};
