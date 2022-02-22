<h1 style="text-align: center">Boas vindas ao projeto Crypto Index!<h1>

<table style="margin: auto">
  <tr>
    <td>
      <img src="https://github.com/vinigofr/crypto_index/blob/main/images/login.jpeg?raw=true" width="400"/>
    </td>
    <td>
      <img src="https://github.com/vinigofr/crypto_index/blob/main/images/currencies.jpeg?raw=true" width="400"/>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/vinigofr/crypto_index/blob/main/images/not_found.jpeg?raw=true" width="400"/>
    </td>
    <td>
      <img src="https://github.com/vinigofr/crypto_index/blob/main/images/update_currencies.jpeg?raw=true" width="400"/>
    </td>
  </tr>
</table>

Para o desenvolvimento desde projeto, foi utilizada a API externa da [**CoinDesk**](https://www.coindesk.com/).

# Sumário

- [Observações](#observações)
- [Tecnologias e bibliotecas utilizadas](#tecnologias-utilizadas)
- [Requisitos necessários](#requisitos)
- [Como rodar em sua maquina](#como-rodar-em-sua-maquina)
- [Endpoints da aplicação](#endpoints)
- [Testes](#testes)

# Observações:
### - O arquivo `.ENV` já está na pasta `backend` apenas para facilitar a execução do projeto e para fins didáticos. Entretanto essa prática **JAMAIS** deve ser utilizada em produção. Você tem total liberdade para alterar o `.ENV` como bem entender.

### - Antes de executar o projeto, verifique se nenhuma das portas (3000/Front e 4000/Back) está em uso por outras aplicações. Caso esteja, feche os servidores que as usam ou altere o arquivo `.ENV`.

# Tecnologias utilizadas:

## Frontend (JavaScrip, CSS, React)
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [StyledComponents](https://www.styled-components.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [ESLint](https://eslint.org/)

## Backend (NodeJS)
- [NodeJS](https://nodejs.org/)
- [Cors](https://www.npmjs.com/package/cors)
- [DotENV](https://www.npmjs.com/package/dotenv)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Express](https://expressjs.com/)
- [Joi](https://joi.dev/api/)
- [Axios](https://www.npmjs.com/package/axios)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Frisby](https://frisbyjs.com/)

# Requisitos:

## Para rodar o projeto localmente em sua maquina, será necessário ter instalado:
### 1. Node.Js LTS
### 2. NPM (Node Package Manager)
### 3. Opcional: Git (Ferramenta de versionamento)

# Como rodar em sua máquina

## Passo a passo de como inicializar a aplicação:
### 1. Caso prefira, crie uma pasta local e utilize o nome que desejar. Abra-a com o terminal do seu sistema operacional.
### 2. Digite `git clone git@github.com:vinigofr/crypto_index.git` e aguarde o download ou baixe o .zip direto no GitHub.
### **EXTRA**: Caso esteja usando um **SO Linux** baseado em **Ubuntu** e que possua **gnome-shell**, você pode executar diretamente da raiz do projeto o comando `./initialize.sh` que fará tudo o que o tópico 3 descreve.
### 3. Agora no seu terminal:
  - ### 3.1 Digite `cd crypto_index` para ir para a baixada.
  - ### 3.2 Acesse a pasta `backend` e digite terminal `npm install` para instalar as dependências do **backend**.
  - ### 3.3 Ainda na pasta **backend**, digite `npm start` e aguarde a inicialização do servidor.
  - ### 3.4 Acesse a pasta `frontend` e digite `npm install` para instalar as dependências do **frontend**.
  - ### 3.5 Digite `npm start` para iniciar a página.
  - ### 3.6 Por padrão, o React abre a pagina `http://localhost:3000/`. Porem, para melhor experiencia, é recomendado que você abra o navegador e digite `http://localhost:3000/login`.

# Endpoints:

## Backend:

### 1. GET - `http://localhost:4000/helloworld` -> Endpoint teste para verificar se o servidor está inicializado.

### 2. POST - `http://localhost:4000/api/login` -> Endpoint de login que deve receber **email** e **senha** válidos para retornar um token.

- Email com padrão "nome@prefixo.com" e senha com seis caracteres, todos numéricos.
```JSON
{
  "email": "example@example.com",
  "password": "123456"
}
```
- Retorno:
```JSON
{
  "token": "TOKEN AQUI"
}
```
### 3. GET - `http://localhost:4000/api/crypto/btc` -> Endpoint que retorna a cotação do Bitcoin nas moedas **USD** (United States Dólar), **BRL** (Real Brasileiro), **EUR** (Euro) e **CAD** (Dólar Canadense)
- Este endpoint espera como parâmetro um token de autorização que deve ser enviado no cabeçalho da requisição:
```JSON
{
  "headers": {
    "Authorization": "TOKEN AQUI"
  }
}
```
- Caso ocorra tudo como esperado, a aplicação deve retornar um JSON semelhante ao conteúdo abaixo:
```JSON
/* Retorno do endpoint `/api/crypto/btc` */
{
  "time": {
    "updated": "Mar 22, 2020 23:54:00 UTC",
    "updatedISO": "2020-03-22T23:54:00+00:00",
    "updateduk": "Mar 22, 2020 at 23:54 GMT"
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  "bpi": {
    "USD": {
      "code": "USD",
      "rate": "6,506.6717",
      "description": "United States Dollar",
      "rate_float": 6506.6717
    },
    "BRL": {
      "code": "BRL",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Brazilian Real",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "EUR": {
      "code": "EUR",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Euro",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "CAD": {
      "code": "CAD",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Canadian Dollar",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "BTC": {
      "code": "BTC",
      "rate": "1.0000",
      "description": "Bitcoin",
      "rate_float": 1
    }
  }
}
```

### 4. POST - `http://localhost:4000/api/crypto/btc` -> Endpoint para edição da cotação das moedas **BRL**, **EUR** e **CAD**:
- Este endpoint espera como um dos parâmetros, um token de autorização que deve ser enviado no cabeçalho da requisição.
- Devem ser também enviados os dados `currency` e `value`, onde currency é o código da moeda e value é o valor.
- OBS: **value** deve ser um **inteiro**  
```JSON
{
  "currency": "BRL",
  "value": "6" /* OU */ 6
}
```
- Caso ocorra tudo como esperado, a aplicação deve retornar um JSON semelhante ao conteúdo abaixo:
```JSON
{
  "message": "Valor alterado com sucesso!"
}
```

### 5. GET `http://localhost:4000/api/crypto/btc/base` -> Endpoint que retorna a cotação atual das moedas salvas no arquivo currencies.json:
- Este endpoint requer como parâmetro apenas o token no cabeçalho da requisição.
- Retorno: 
```JSON
{
    "BRL": "5.400",
    "EUR": "0.920",
    "CAD": "1.440"
}
```

### 6. `http://localhost:4000/` -> Qualquer requisição feita para rotas inexistentes retornará um `STATUS CODE 404 - NOT FOUND`:
```JSON
{
  "message": "Endpoint não encontrado"
}
```

## Frontend:

### 1. `http://localhost:3000/login` -> Endpoint de login que deve receber **email** e **senha** válidos para retornar um token que é salvo no `localStorage`.

### 2. `http://localhost:3000/` -> Endpoint que retorna a página inicial/principal do **frontend**.

### 3. `http://localhost:3000/update` -> Endpoint que retorna a página atualização das moedas salvas no **backend**.

### 4. `http://localhost:3000/<rota-inexistente>` -> Qualquer requisição feita para rotas inexistentes retornará uma pagina de `Not Found`.:

# Testes:

## Para realização de testes no backend:
### 1. Acesse a pasta `backend` e execute o comando `npm test`.

### 2. Para realizar a verificação de cobertura de testes:
- Ainda na pasta `backend` execute `npm run coverage`
