import React from 'react';
import { apiGetCurrency } from '../Api/CryptoApi';
import useForceLogin from '../Hooks/useForceLogin';

function Home() {
  const [btcCurrencies, setBtcCurrencies] = React.useState([]);
  const [btcValue, setBtcValue] = React.useState(1);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { forceLogin, redirectMessage } = useForceLogin();

  React.useEffect(async () => {
    const token = localStorage.getItem('token');

    const responseCurrencies = await apiGetCurrency(token);
    setLoading(false);
    if (token) {
      if (responseCurrencies.message) {
        setError(true);
        forceLogin(responseCurrencies.message);
      } else { setBtcCurrencies(responseCurrencies); }
    } else {
      setError(true);
      forceLogin('Nao autenticado');
    }
  }, []);

  function changeBtcValue(value) {
    if (value > 0) {
      setBtcValue(value);
    } else {
      setBtcValue(1);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading || error}
      >
        Atualizar valor monetário
      </button>
      <form>
        <label htmlFor="btcValue">
          Bitcoin
          <input
            disabled={loading || error}
            id="btcValue"
            name="btcValue"
            type="number"
            placeholder="Ex: 5"
            min={1}
            autoComplete="off"
            onChange={({ target }) => changeBtcValue(target.value)}
          />
        </label>
      </form>
      <div>
        { error && <p>{redirectMessage}</p>}
        { !error && btcCurrencies.length > 0 && (
          btcCurrencies.map(({ code, value }) => (
            <div>
              <h3>{code}</h3>
              <p>{(value * btcValue).toFixed(2)}</p>
            </div>
          ))
        )}
        { loading && <p>Carregando...</p> }
      </div>
    </div>
  );
}

export default Home;
