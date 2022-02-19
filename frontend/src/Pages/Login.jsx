/* eslint-disable max-len */
function Login() {
  return (
    <div>
      Login page!
    </div>
  );
}

export default Login;

// Essa página deve conter um formulário de e-mail e senha e um botão "Entrar".

// Ao clicar no botão, deve ser feita uma requisição para o endpoint de /api/login da API.

// Caso a requisição seja bem sucedida, o token retornado deve ser salvo no localStorage, e a página deve ser redirecionada para a raiz da aplicação ("/").

// Caso contrário, a mensagem de erro deve ser exibida na tela.
