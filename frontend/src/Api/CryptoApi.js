import axios from 'axios';
import formatApiResponse from '../Utils/formatApiResponse';

const BASE_URL = 'http://localhost:4000/api/';
const CONN_ERR = 'Erro ao conectar-se com o servidor.';

function apiLogin({ email, password }) {
  return axios
    .post(`${BASE_URL}login`, {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      return true;
    })
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
}

function apiGetCurrency(token) {
  return axios
    .get(`${BASE_URL}crypto/btc`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => formatApiResponse(res))
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
}

function apiGetBaseCurrencies(token) {
  return axios
    .get(`${BASE_URL}crypto/btc/base`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
}

async function apiUpdateCurrency(token, data) {
  return axios
    .post(`${BASE_URL}crypto/btc`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
}

export {
  apiLogin,
  apiGetCurrency,
  apiUpdateCurrency,
  apiGetBaseCurrencies,
};
