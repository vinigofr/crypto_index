import React from 'react';
import { apiLogin } from '../Api/CryptoApi';

/* eslint-disable max-len */
function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await apiLogin({ email, password });

    if (result.message) {
      setErrorMessage(result.message);
      setError(true);
    }
  };

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
        <button type="submit">Login</button>
      </form>
      { error && <p>{errorMessage}</p> }
    </div>
  );
}

export default Login;

// Caso a requisição seja bem sucedida, o token retornado deve ser salvo no localStorage, e a página deve ser redirecionada para a raiz da aplicação ("/").
