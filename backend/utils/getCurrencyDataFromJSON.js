const fs = require('fs');
const path = require('path');

const getCurrencyDataFromJSON = () => {
  const filePath = path.join(`${__dirname}/../currencies.json`);
  const rawCurrencies = fs.readFileSync(filePath);
  return JSON.parse(rawCurrencies);
};

module.exports = { getCurrencyDataFromJSON };
