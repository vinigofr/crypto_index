import axios from 'axios';
import formatApiResponse from '../Utils/formatApiResponse';

const BASE_URL = 'http://localhost:4000/api/';

function apiLogin({ email, password }) {
  const response = axios
    .post(`${BASE_URL}login`, {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      return true;
    })
    .catch((error) => error.response.data);
  return response;
}

function apiGetCurrency(token) {
  const response = axios
    .get(`${BASE_URL}crypto/btc`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => formatApiResponse(res))
    .catch((error) => error.response.data);
  return response;
}

function apiUpdateCurrency(token, currency) {
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

export { apiLogin, apiGetCurrency, apiUpdateCurrency };
