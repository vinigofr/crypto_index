// Source:
// https://stackoverflow.com/questions/24758817/javascript-number-tolocalestring-with-4-digits-after-separator
const getRateFloat = (currencyValue, usdRateFloat) => Number((
  Number(currencyValue) * usdRateFloat)
  .toFixed(4))
  .toLocaleString('en-US', { minimumFractionDigits: 4 });

const getRate = (currencyValue, usdRateFloat) => Number((
  Number(currencyValue) * usdRateFloat)
  .toFixed(4));

module.exports = {
  getRateFloat,
  getRate,
};
