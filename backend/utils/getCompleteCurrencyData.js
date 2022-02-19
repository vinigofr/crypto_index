const { getCurrencyDataFromJSON } = require('./getCurrencyDataFromJSON');
const { getRate, getRateFloat } = require('./formatCurrency');

const getCompleteCurrencyData = (apiResponse) => {
  const { BRL, CAD, EUR } = getCurrencyDataFromJSON();
  const modifiedResponse = apiResponse;

  modifiedResponse.bpi.BRL = {
    code: 'BRL',
    rate: getRate(BRL, modifiedResponse.bpi.USD.rate_float),
    description: 'Brazilian Real',
    rate_float: getRateFloat(BRL, modifiedResponse.bpi.USD.rate_float),
  };

  modifiedResponse.bpi.EUR = {
    code: 'EUR',
    rate: getRate(EUR, modifiedResponse.bpi.USD.rate_float),
    description: 'Euro',
    rate_float: getRateFloat(EUR, modifiedResponse.bpi.USD.rate_float),
  };

  modifiedResponse.bpi.CAD = {
    code: 'CAD',
    rate: getRate(CAD, modifiedResponse.bpi.USD.rate_float),
    description: 'Canadian Dollar',
    rate_float: getRateFloat(CAD, modifiedResponse.bpi.USD.rate_float),
  };

  return modifiedResponse;
};

module.exports = {
  getCompleteCurrencyData,
};
