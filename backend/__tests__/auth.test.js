require('dotenv').config();
const frisby = require('frisby');

const PORT = process.env.PORT || 4000;
const { JWT_SECRET } = process.env;
const URL = `http://localhost:${PORT}/`;
const fs = require('fs');
const path = require('path');
const fetchBtcCurrency = require('../api/fetchBtcCurrency');
const { app } = require('../app');

jest.mock('../api/fetchBtcCurrency');

const API_RESPONSE = {
  time: {
    updated: 'Feb 15, 2022 23:23:00 UTC',
    updatedISO: '2022-02-15T23:23:00+00:00',
    updateduk: 'Feb 15, 2022 at 23:23 GMT',
  },
  disclaimer:
    'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  bpi: {
    USD: {
      code: 'USD',
      rate: '44,299.8351',
      description: 'United States Dollar',
      rate_float: 44299.8351,
    },
    BTC: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1,
    },
  },
};

const FAKE_CREDENTIALS = {
  email: 'fake@fake.com',
  password: '123456',
};

// To solve mock server problem, I create this topic on Stack Overflow:
// https://stackoverflow.com/questions/71152604/how-to-mock-a-function-using-frisby-and-jest-to-return-custom-response
describe('Testing authentication GET and POST /api/crypto/btc', () => {
  beforeAll((done) => {
    server = app.listen(PORT, () => {
      done();
    });
  });

  afterAll(async () => {
    fs.writeFileSync(
      path.join(__dirname, '../currencies.json'),
      JSON.stringify({
        BRL: '5.400',
        EUR: '0.920',
        CAD: '1.440',
      }),
    );

    await server.close();
  });

  it('GET /api/crypto/btc should return status code 200 when authenticated', async () => {
    fetchBtcCurrency.getCurrency.mockImplementation(() => (API_RESPONSE));

    const token = await frisby
      .post(`${URL}api/login`, FAKE_CREDENTIALS)
      .then((res) => res.json.token);

    await frisby
      .get(`${URL}api/crypto/btc`, {
        headers: {
          Authorization: token,
        },
      }).expect('status', 200);
  });

  it('POST /api/crypto/btc should return status code 200 when authenticated', async () => {
    fetchBtcCurrency.getCurrency.mockImplementation(() => (API_RESPONSE));

    const token = await frisby
      .post(`${URL}api/login`, FAKE_CREDENTIALS)
      .then((res) => res.json.token);

    return frisby
      .post(`${URL}api/crypto/btc`, {
        headers: {
          Authorization: token,
        },
        body: {
          currency: 'EUR',
          value: 1,
        },
      }).expect('status', 200);
  });

  it('GET /api/crypto/btc should return status code 401 when not authenticated', async () => frisby
    .get(`${URL}api/crypto/btc`).expect('status', 401));

  it('POST /api/crypto/btc should return status code 401 when not authenticated', async () => frisby.post(`${URL}api/crypto/btc`)
    .expect('status', 401));

  it('GET /api/crypto/btc should return json { message: "Token inv??lido" } when not authenticated', () => frisby.get(`${URL}api/crypto/btc`)
    .expect('json', { message: 'Token inv??lido' }));

  it('POST /api/crypto/btc should return json { message: "Token inv??lido" } when not authenticated', () => frisby.post(`${URL}api/crypto/btc`)
    .expect('json', { message: 'Token inv??lido' }));
});
