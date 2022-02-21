import axios from 'axios';
import formatApiResponse from '../Utils/formatApiResponse';

const BASE_URL = 'http://localhost:4000/api/';
const CONN_ERR = 'Erro ao conectar-se com o servidor.';

function apiLogin({ email, password }) {
  const response = axios
    .post(`${BASE_URL}login`, {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
    })
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
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
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
  return response;
}

function apiGetBaseCurrencies(token) {
  const response = axios
    .get(`${BASE_URL}crypto/btc/base`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((error) => error.response.data)
    .catch(() => ({ CONN_ERR }));
  return response;
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
