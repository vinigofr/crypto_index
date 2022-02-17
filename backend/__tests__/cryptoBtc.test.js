require("dotenv").config();
const frisby = require("frisby");
const PORT = process.env.PORT;
const URL = `http://localhost:${PORT}/`;
const fetchBtcCurrency = require('../api/fetchBtcCurrency');
const { app } = require('../app');
const { getCurrencyDataFromJSON } = require('../utils/getCurrencyDataFromJSON');

jest.mock('../api/fetchBtcCurrency');

const API_RESPONSE = {
  time: {
    updated: "Feb 15, 2022 23:23:00 UTC",
    updatedISO: "2022-02-15T23:23:00+00:00",
    updateduk: "Feb 15, 2022 at 23:23 GMT",
  },
  disclaimer:
    "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  bpi: {
    USD: {
      code: "USD",
      rate: "44,299.8351",
      description: "United States Dollar",
      rate_float: 44299.8351,
    },
    BTC: {
      code: "BTC",
      rate: "1.0000",
      description: "Bitcoin",
      rate_float: 1,
    },
  },
};

const currencies = getCurrencyDataFromJSON();

// https://stackoverflow.com/questions/24758817/javascript-number-tolocalestring-with-4-digits-after-separator
const MODIFIED_API_RESPONSE = {
  time: {
    updated: "Feb 15, 2022 23:23:00 UTC",
    updatedISO: "2022-02-15T23:23:00+00:00",
    updateduk: "Feb 15, 2022 at 23:23 GMT",
  },
  disclaimer:
    "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  bpi: {
    USD: {
      code: "USD",
      rate: API_RESPONSE.bpi.USD.rate,
      description: "United States Dollar",
      rate_float: API_RESPONSE.bpi.USD.rate_float,
    },
    BRL: {
      code: "BRL",
      rate: Number((Number(currencies.BRL) * API_RESPONSE.bpi.USD.rate_float).toFixed(4)).toLocaleString('en-US', { minimumFractionDigits: 4 }),
      description: "Brazilian Real",
      rete_float: Number((Number(currencies.BRL) * API_RESPONSE.bpi.USD.rate_float).toFixed(4)),
    },
    EUR: {
      code: "EUR",
      rate: Number((Number(currencies.EUR) * API_RESPONSE.bpi.USD.rate_float).toFixed(4)).toLocaleString('en-US', { minimumFractionDigits: 4 }),
      description: "Euro",
      rete_float: Number((Number(currencies.EUR) * API_RESPONSE.bpi.USD.rate_float).toFixed(4)),
    },
    CAD: {
      code: "CAD",
      rate: Number((Number(currencies.CAD) * API_RESPONSE.bpi.USD.rate_float).toFixed(4)).toLocaleString('en-US', { minimumFractionDigits: 4 }),
      description: "Canadian Dollar",
      rete_float: Number((Number(currencies.CAD) * API_RESPONSE.bpi.USD.rate_float).toFixed(4)),
    },
    BTC: {
      code: "BTC",
      rate: "1.0000",
      description: "Bitcoin",
      rate_float: 1,
    },
  },
}

describe("Testing GET /api/crypto/btc", () => {

  beforeAll((done) => {
    server = app.listen(PORT, () => {
      done();
    });
  });

  afterAll(() => {
    server.close();
  });

  it('Verify if returns correct response with status code 200', async () => {
    
    fetchBtcCurrency.getCurrency.mockImplementation(() => (API_RESPONSE));

    await frisby
      .get(`${URL}api/crypto/btc`)
      .expect('status', 200)
      .expect('json', MODIFIED_API_RESPONSE);
  });
});
