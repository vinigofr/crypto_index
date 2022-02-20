const formatApiResponse = (response) => {
  const { data: { bpi } } = response;

  const currencies = [];
  Object.keys(bpi).forEach((code) => {
    if (code !== 'BTC') {
      const { rate_float: value } = bpi[code];
      currencies.push({ code, value });
    }
  });
  return currencies;
};

export default formatApiResponse;
