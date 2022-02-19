import React from 'react';
import { apiLogin } from '../Api/CryptoApi';

/* eslint-disable max-len */
function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiLogin(email, password);
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
    </div>
  );
}

export default Login;

// Ao clicar no botão, deve ser feita uma requisição para o endpoint de /api/login da API.

// Caso a requisição seja bem sucedida, o token retornado deve ser salvo no localStorage, e a página deve ser redirecionada para a raiz da aplicação ("/").

// Caso contrário, a mensagem de erro deve ser exibida na tela.
