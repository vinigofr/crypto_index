import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetCurrency } from '../Api/CryptoApi';
import useMessage from '../Hooks/useMessage';
import InputNumber from '../StyledComponents/InputNumber';
import Button from '../StyledComponents/Button';

function Home() {
  const [btcCurrencies, setBtcCurrencies] = React.useState([]);
  const [btcValue, setBtcValue] = React.useState(1);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { setMessage, redirectMessage } = useMessage();
  const navigate = useNavigate();

  React.useEffect(async () => {
    const token = localStorage.getItem('token');

    const responseCurrencies = await apiGetCurrency(token);
    setLoading(false);

    if (responseCurrencies.CONN_ERR) {
      setError(true);
      setMessage({
        route: '/login',
        message: `${responseCurrencies.CONN_ERR} Direcionando para /login em 5 segundos`,
      });
      return;
    }

    if (!token) {
      setError(true);
      setMessage({
        route: '/login',
        message: 'Nao autenticado! Direcionando para /login em 5 segundos',
      });
      return;
    }

    if (responseCurrencies.message) {
      setError(true);
      setMessage({
        message: `${responseCurrencies.message}. Direcionando para /login em 5 segundos`,
        route: '/login',
      });
    } else {
      setBtcCurrencies(responseCurrencies);
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
    <div className="home-container">
      <Button
        type="button"
        disabled={loading || error}
        onClick={() => navigate('/update')}
      >
        Atualizar valor monetário
      </Button>
      <form>
        <label htmlFor="btcValue">
          Bitcoin
          <InputNumber
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
      <div className="currency-list">
        { !error && btcCurrencies.length > 0 && (
          btcCurrencies.map(({ code, value }) => (
            <div className="currency-card">
              <h3 className="currency-title">{code}</h3>
              <p className="currency-price">{(value * btcValue).toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
      <div className="message-container">
        { error && <p>{redirectMessage}</p>}
        { loading && <p>Carregando...</p> }
      </div>
    </div>
  );
}

export default Home;
