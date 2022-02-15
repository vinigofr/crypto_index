require('dotenv').config();
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

  it('Verify if when called without data, return status code 400 with JSON { message: "Campos inválidos" }', async () => {
    await frisby.post(`${URL}api/login`, {
      body: {
        email: "",
        password: ""
      }
    })
      .expect('status', 400)
      .expect('json', { message: 'Campos inválidos' });
  });

  it('Verify if when inserted correct format data, return a token with 168 random characters', async () => {
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

      expect(token.length).toBe(168);
      expect(jwt.verify(token, JWT_SECRET, (err) => {
        if(err) return false
        return true
      })).toBe(true)
    });
  });
});
