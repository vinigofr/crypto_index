import React from 'react';
import { apiUpdateCurrency, apiGetBaseCurrencies } from '../Api/CryptoApi';
import useForceLogin from '../Hooks/useForceLogin';

function Update() {
  const [token, setToken] = React.useState(null);
  const [newCurrencyValue, setNewCurrencyValue] = React.useState(0);
  const [baseCurrencies, setBaseCurrencies] = React.useState({});
  const [selectedCurrency, setSelectedCurrency] = React.useState('BRL');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { forceLogin, redirectMessage } = useForceLogin();

  React.useEffect(async () => {
    const authToken = localStorage.getItem('token');
    const apiBaseCurrencies = await apiGetBaseCurrencies(authToken);
    setLoading(false);

    if (apiBaseCurrencies.CONN_ERR) {
      setError(true);
      forceLogin(apiBaseCurrencies.CONN_ERR);
      return;
    }

    if (!authToken) {
      setError(true);
      forceLogin('Nao autenticado');
    }

    if (apiBaseCurrencies.message) {
      setError(true);
      forceLogin(apiBaseCurrencies.message);
    } else {
      setToken(authToken);
      setBaseCurrencies(apiBaseCurrencies);
    }
  }, []);

  const updateValue = (e) => {
    e.prevendDefault();

    const updateData = {
      code: selectedCurrency,
      value: newCurrencyValue,
    };

    apiUpdateCurrency(token, updateData);
  };

  return (
    <div>
      <button
        type="button"
        disabled={loading || error}
      >
        Voltar
      </button>
      <form onSubmit={(e) => updateValue(e)}>
        <label htmlFor="currency">
          Moeda
          <select
            onChange={(e) => setSelectedCurrency(e.target.value)}
            disabled={loading || error}
          >
            {
              Object.keys(baseCurrencies).map((code) => (
                <option>
                  {code}
                </option>
              ))
            }
          </select>
        </label>
        <p>
          Valor atual:
          {' '}
          { baseCurrencies[selectedCurrency] }
        </p>
        <label htmlFor="newValue">
          Novo valor
          <input
            disabled={loading || error}
            id="newValue"
            type="number"
            onChange={({ target: value }) => setNewCurrencyValue(value)}
          />
        </label>
      </form>
      { error && <p>{redirectMessage}</p> }
    </div>
  );
}

export default Update;
