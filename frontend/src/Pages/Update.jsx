import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUpdateCurrency, apiGetBaseCurrencies } from '../Api/CryptoApi';
import useMessage from '../Hooks/useMessage';
import Button from '../StyledComponents/Button';
import InputNumber from '../StyledComponents/InputNumber';
import Select from '../StyledComponents/Select';

function Update() {
  const [token, setToken] = React.useState(null);
  const [newCurrencyValue, setNewCurrencyValue] = React.useState(0);
  const [baseCurrencies, setBaseCurrencies] = React.useState({});
  const [selectedCurrency, setSelectedCurrency] = React.useState('BRL');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { setMessage, redirectMessage } = useMessage();
  const navigate = useNavigate();

  React.useEffect(async () => {
    const authToken = localStorage.getItem('token');
    const apiBaseCurrencies = await apiGetBaseCurrencies(authToken);
    setLoading(false);

    if (apiBaseCurrencies.CONN_ERR) {
      setError(true);
      setMessage({
        message: `${apiBaseCurrencies.CONN_ERR} Direcionando para /login em 5 segundos`,
        route: '/login',
      });
      return;
    }

    if (!authToken) {
      setError(true);
      setMessage({
        message: 'Nao autenticado! Direcionando para /login em 5 segundos',
        route: '/login',
      });
    }

    if (apiBaseCurrencies.message) {
      setError(true);
      setMessage({
        message: apiBaseCurrencies.message,
      });
    } else {
      setToken(authToken);
      setBaseCurrencies(apiBaseCurrencies);
    }
  }, []);

  const updateValue = async (e) => {
    e.preventDefault();

    const updateData = {
      currency: selectedCurrency,
      value: newCurrencyValue,
    };

    const response = await apiUpdateCurrency(token, updateData);
    if (response.CONN_ERR) {
      setError(true);
      setMessage({
        message: response.CONN_ERR,
      });
      return;
    }

    if (response.message) {
      setError(true);
      setMessage({
        message: response.message,
      });
    }

    if (response.message === 'Valor alterado com sucesso!') {
      setMessage({
        message: `${response.message} Direcionando para pagina inicial em 5 segundos`,
        route: '/',
      });
    }
  };

  return (
    <div>
      <Button
        type="button"
        disabled={loading}
        onClick={() => navigate('/')}
      >
        Voltar
      </Button>
      <form onSubmit={(e) => updateValue(e)}>
        <label htmlFor="currency">
          Moeda
          <Select
            onChange={(e) => setSelectedCurrency(e.target.value)}
            disabled={loading}
          >
            {
              Object.keys(baseCurrencies).map((code) => (
                <option>
                  {code}
                </option>
              ))
            }
          </Select>
        </label>
        <p>
          Valor atual:
          {' '}
          { baseCurrencies[selectedCurrency] }
        </p>
        <label htmlFor="newValue">
          Novo valor
          <InputNumber
            min={1}
            disabled={loading}
            id="newValue"
            type="number"
            placeholder="Ex: 5"
            onChange={({ target: { value } }) => setNewCurrencyValue(value)}
          />
        </label>
        <Button type="submit">Atualizar</Button>
      </form>
      { error && <p>{redirectMessage}</p> }
    </div>
  );
}

export default Update;
