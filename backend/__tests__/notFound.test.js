require('dotenv').config();
const frisby = require('frisby');

const URL = 'http://localhost:4000/';
const { app } = require('../app');

const { PORT } = process.env;

describe('Testing unknown routes', () => {
  beforeAll((done) => {
    server = app.listen(PORT, () => {
      done();
    });
  });

  afterAll(async () => {
    await server.close();
  });

  it('Verify if unknown routes are default message and status code 404', async () => {
    const response = { message: 'Endpoint não encontrado' };

    await frisby.get(`${URL}api/unknown`).expect('status', 404).expect('json', response);
    await frisby.get(`${URL}unknown`).expect('status', 404).expect('json', response);
    await frisby.get(`${URL}api/testing`).expect('status', 404).expect('json', response);
    await frisby.get(`${URL}testing`).expect('status', 404).expect('json', response);
    await frisby.get(`${URL}api/xablau`).expect('status', 404).expect('json', response);
    await frisby.get(`${URL}xablau`).expect('status', 404).expect('json', response);
  });
});
