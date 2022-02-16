require("dotenv").config();
const frisby = require("frisby");
const jwt = require("jsonwebtoken");
const URL = "http://localhost:4000/";

const API_MOCK_RESPONSE = {
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

// For BRL
const OneDollar_BRAZIL = 5.40 // Brazilian rate_float from file .JSON
const OneBTC_Dollar = 44299.8351 // From API rate_float
const OneBTC_REAIS = OneDollar_BRAZIL * OneBTC_Dollar; // 239219.10954

// For CAD
const OneDollar_CANADA = 5.40 // canadaian rate_float from file .JSON
const OneBTC_Dollar = 44299.8351 // From API rate_float
const OneBTC_CANADA = OneDollar_BRAZIL * OneBTC_Dollar; // 239219.10954

// For EUR
const OneDollar_EUROPA = 5.40 // EUROPA rate_float from file .JSON
const OneBTC_Dollar = 44299.8351 // From API rate_float
const OneBTC_EUROPA = OneDollar_BRAZIL * OneBTC_Dollar; // 239219.10954

const JWT_SECRET = process.env.JWT_SECRET;

describe("Testing GET /api/crypto/btc", () => {
  it('', async () => {});
  it('', async () => {});
  it('', async () => {});
});
