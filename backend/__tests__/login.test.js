const frisby = require('frisby');
const URL = 'http://localhost:4000/';

describe('Testing POST /api/login', () => {
  it('Verify if when called with malformed data, return status code 400 with JSON { message: "Campos inválidos" }', async () => {
    await frisby.post(`${URL}api/login`, {
      body: {
        email: "wrongmail@.com",
        password: "pass"
      }
    })
      .expect('status', 400)
      .expect('json', { message: 'Campos inválidos' });
  });
});
