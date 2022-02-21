import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../Api/CryptoApi';
import Button from '../StyledComponents/Button';
import Input from '../StyledComponents/Input';

function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await apiLogin({ email, password });

    if (result.CONN_ERR) {
      setError(true);
      setErrorMessage(result.CONN_ERR);
      return;
    }

    if (result.message) {
      setErrorMessage(result.message);
      setError(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">
          Email
          <Input
            id="email"
            name="email"
            type="text"
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <Input
            id="password"
            name="password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <Button type="submit">Entrar</Button>
      </form>
      <div className="messageContainer">
        { error && <p>{errorMessage}</p> }
      </div>
    </div>
  );
}

export default Login;
