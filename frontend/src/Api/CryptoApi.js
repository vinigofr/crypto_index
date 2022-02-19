import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/';

function login({ email, password }) {
  axios
    .post(`${BASE_URL}login`, {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
    })
    .catch((error) => console.log(error));
}

function getCurrency(token) {
  axios
    .get(`${BASE_URL}crypto/btc`, {
      headers: {
        Authorization: token,
      },
    })
    .catch((error) => console.log(error));
}

function updateCurrency(token, currency) {
  const { code, value } = currency;

  axios
    .post(`${BASE_URL}crypto/btc`, {
      code,
      value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
}

export { login, getCurrency, updateCurrency };
