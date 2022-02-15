const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const URL = 'http://localhost:4000/';

const JWT_SECRET = process.env.JWT_SECRET;

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

  it('Verify if when inserted correct data, return a token with 16 random characters', async () => {
    await frisby.post(`${URL}api/login`, {
      body: {
        email: 'example@example.com',
        password: '123456'
      }
    })
    .expect('status', 200)
    .then((responseLogin) => {
      const { body } = responseLogin;
      const result = JSON.parse(body);
      const { token } = result;

      expect(token.length).toBe(16);
      expect(jwt.verify(token, JWT_SECRET)).toBe(true)
    });
  });
});
