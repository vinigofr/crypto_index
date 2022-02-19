const fs = require('fs');
const pathJoin = require('path').join;

const { getCurrency } = require('../api/fetchBtcCurrency');
const { getCompleteCurrencyData } = require('../utils/getCompleteCurrencyData');
const { getCurrencyDataFromJSON } = require('../utils/getCurrencyDataFromJSON');

const getBtcCurrency = async () => {
  const responseFromApi = await getCurrency();
  return getCompleteCurrencyData(responseFromApi);
};

const updateCurrency = ({ currency, value }) => {
  const currentCurrencyData = getCurrencyDataFromJSON();
  currentCurrencyData[currency] = String(value);

  fs.writeFileSync(
    pathJoin(__dirname, '../currencies.json'),
    JSON.stringify(currentCurrencyData),
  );

  return {
    message: 'Valor alterado com sucesso!',
  };
};

module.exports = {
  getBtcCurrency,
  updateCurrency,
};
