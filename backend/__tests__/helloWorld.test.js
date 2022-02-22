require('dotenv').config();
const frisby = require('frisby');
const PORT = process.env.PORT || 4000;

const URL = `http://localhost:${PORT}/`;
const { app } = require('../app');

jest.mock('../api/fetchBtcCurrency');

// References to learn testing
// https://medium.com/serasa-consumidor/parte-1-introdu%C3%A7%C3%A3o-e-requisi%C3%A7%C3%B5es-get-6c7ec9c7c778
// https://docs.frisbyjs.com/api-and-usage/expectations-assertions#expect-jsontypes-path-data
describe('Testing "Hello World" route', () => {
  beforeAll((done) => {
    server = app.listen(PORT, () => {
      done();
    });
  });

  afterAll(async () => {
    await server.close();
  });

  it('Verify if when called endpoint /helloworld, returns "Hello World"', async () => {
    await frisby.get(`${URL}helloworld`)
      .expect('status', 200)
      .expect('json', { message: 'Hello World!' });
  });
});
