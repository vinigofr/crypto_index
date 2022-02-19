import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../Api/CryptoApi';

/* eslint-disable max-len */
function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await apiLogin({ email, password });

    if (result.message) {
      setErrorMessage(result.message);
      setError(true);
    } else {
      navigate('/');
    }
  };

  React.useEffect(() => {
    if ('token tiver no local storage') {
      // Verifique no backend se o token é válido
      // Se for, direcione para a página principal
    } else {
      // Se nao tiver token, direcione para a página de login
      // Se tiver token mas for invalido, limpe o token do local storage
    }
  }, []);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="text"
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            name="password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      { error && <p>{errorMessage}</p> }
    </div>
  );
}

export default Login;
