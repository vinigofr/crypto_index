require("dotenv").config();
const frisby = require("frisby");
const PORT = process.env.PORT;
const URL = `http://localhost:${PORT}/`;
const fetchBtcCurrency = require('../api/fetchBtcCurrency');
const { app } = require('../app');
const { getCurrencyDataFromJSON } = require('../utils/getCurrencyDataFromJSON');
const { getRate, getRateFloat } = require('../utils/formatCurrency');
const fs = require('fs');
const path = require('path');

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
      rate: getRate(currencies.BRL, API_RESPONSE.bpi.USD.rate_float),
      description: "Brazilian Real",
      rate_float: getRateFloat(currencies.BRL, API_RESPONSE.bpi.USD.rate_float)
    },
    EUR: {
      code: "EUR",
      rate: getRate(currencies.EUR, API_RESPONSE.bpi.USD.rate_float),
      description: "Euro",
      rate_float: getRateFloat(currencies.EUR, API_RESPONSE.bpi.USD.rate_float)
    },
    CAD: {
      code: "CAD",
      rate: getRate(currencies.CAD, API_RESPONSE.bpi.USD.rate_float),
      description: "Canadian Dollar",
      rate_float: getRateFloat(currencies.CAD, API_RESPONSE.bpi.USD.rate_float)
    },
    BTC: {
      code: "BTC",
      rate: "1.0000",
      description: "Bitcoin",
      rate_float: 1,
    },
  },
}

// To solve mock server problem, I create this topic on Stack Overflow:
// https://stackoverflow.com/questions/71152604/how-to-mock-a-function-using-frisby-and-jest-to-return-custom-response
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

describe("Testing POST /api/crypto/btc", () => {

  beforeAll((done) => {
    server = app.listen(PORT, () => {
      done();
    });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    // Restore to original file
    fs.writeFileSync(
      path.join(__dirname, '../currencies.json'),
      JSON.stringify({
        "BRL": "5.400",
        "EUR": "0.920",
        "CAD": "1.440"
      })
    );
  });

  it("Verify if the endpoint accepts correct currency codes: BRL, EUR and CAD", async () => {
    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: 'BRL',
        value: 1,
      },
    })
    .expect('status', 200)
    .expect('json', { "message": "Valor alterado com sucesso!" })

    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: 'EUR',
        value: 1,
      },
    })
    .expect('status', 200)
    .expect('json', { "message": "Valor alterado com sucesso!" })

    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: 'CAD',
        value: 1,
      },
    })
    .expect('status', 200)
    .expect('json', { "message": "Valor alterado com sucesso!" })
  });

  it("Verify if the endpoint do not accept incorrect currency code", async () => {
    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: "WRONG VALUE",
        value: 1,
      }
    })
    .expect('status', 400)
    .expect('json', { message: "Moeda inválida" })
  })

  it("Verify if the endpoint do not accept non-numeric or negative values", async () => {
    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: 'BRL',
        value: -1,
      },
    })
    .expect('status', 400)
    .expect('json', { message: "Valor inválido" })

    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: 'BRL',
        value: '1 real',
      },
    })
    .expect('status', 400)
    .expect('json', { message: "Valor inválido" })
  });

  it("The endpoint should can update BRL from currency.json file", async () => {
    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: "BRL",
        value: 5525,
      }
    })
    .expect('status', 200)
    .expect('json', { message: "Valor alterado com sucesso!" })

    const currencies = getCurrencyDataFromJSON();
    expect(currencies.BRL).toBe("5525")
  });

  it("The endpoint should can update EUR from currency.json file", async () => {
    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: "EUR",
        value: 1250,
      }
    })
    .expect('status', 200)
    .expect('json', { message: "Valor alterado com sucesso!" })

    const currencies = getCurrencyDataFromJSON();
    expect(currencies.EUR).toBe("1250")
  });

  it("The endpoint should can update CAD from currency.json file", async () => {
    await frisby.post(`${URL}api/crypto/btc`, {
      body: {
        currency: "CAD",
        value: "10000.0",
      }
    })
    .expect('status', 200)
    .expect('json', { message: "Valor alterado com sucesso!" })

    const currencies = getCurrencyDataFromJSON();
    expect(currencies.CAD).toBe("10000")
  });
});
