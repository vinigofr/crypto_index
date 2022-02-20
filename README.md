# Boas vindas ao projeto Crypto Index!

## Desenvolvimento

Para desenvolvimento desde projeto, foi utilizada a A API externa da [**CoinDesk**](https://www.coindesk.com/).

## Para rodar o projeto localmente em sua maquina, sera necessario ter instalado:
### 1. Node.Js LTS
### 2. NPM (Node Package Manager)
### 3. Git (Ferramenta de versionamento)

---

## Passo a passo de como inicializar a aplicação:
### 1. Crie uma pasta local e utilize o nome que desejar e abra com o terminal do seu sistema operacional.
### 2. Digite `git clone git@github.com:vinigofr/crypto_index.git` e aguarde o download.

## Endpoints da aplicacao:
### 1. GET - `http://localhost:4000/helloworld` -> Endpoint teste para verificar se o servidor esta inicializado.

### 2. POST - `http://localhost:4000/api/login` -> Endpoint de login que deve receber **email** e **senha** validos para retornar um token.

- Email com padrao "nome@prefixo.com" e senha com seis caracteres, todos numericos.
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
### 3. GET - `http://localhost:4000/api/crypto/btc` -> Endpoint que retorna a cotacao do Bitcoin nas moedas **USD** (United States Dolar), **BRL** (Real Brasileiro), **EUR** (Euro) e **CAD** (Dolar Canadense)
- Este endpoint espera como parametro um token de autorizacao que deve ser enviado no cabecalho da requisicao:
```JSON
{
  "headers": {
    "Authorization": "TOKEN AQUI"
  }
}
```
- Caso ocorra tudo como esperado, a aplicacao deve retornar um JSON semelhante ao conteudo abaixo:
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

### 4. POST - `http://localhost:4000/api/crypto/btc` -> Endpoint para edicao da cotacao das moedas **BRL**, **EUR** e **CAD**:
- Este endpoint espera como um dos parametros, um token de autorizacao que deve ser enviado no cabecalho da requisicao.
- Devem ser tambem enviados os dados currency e value, onde currency eh o codigo da moeda e value eh o valor.
- OBS: **value** deve ser um **inteiro**  
```JSON
{
  "currency": "BRL",
  "value": "6" /* OU */ 6
}
```
- Caso ocorra tudo como esperado, a aplicacao deve retornar um JSON semelhante ao conteudo abaixo:
```JSON
{
  "message": "Valor alterado com sucesso!"
}
```

### 5. GET `http://localhost:4000/api/crypto/btc/base` -> Endpoint que retorna a cotacao atual das moedas salvas no arquivo currencies.json:
- Este endpoint requer como parametro apenas o token no cabeçalho da requisicao.
- Retorno: 
```JSON
{
    "BRL": "5.400",
    "EUR": "0.920",
    "CAD": "1.440"
}
```

### 6. `http://localhost:4000/` -> Qualquer requisicao feita para rotas inexistentes retornará um `STATUS CODE 404 - NOT FOUND`:
```JSON
{
  "message": "Endpoint não encontrado"
}
```

## Front-end

### 10 - A URL base do front-end deve ser `localhost:[PORTA]`

### 11 - Crie uma página de login, com a rota `login`

Essa página deve conter um formulário de e-mail e senha e um botão "Entrar".

Ao clicar no botão, deve ser feita uma requisição para o endpoint de `/api/login` da API.

Caso a requisição seja bem sucedida, o token retornado deve ser salvo no `localStorage`, e a página deve ser redirecionada para a raiz da aplicação `("/")`.

Caso contrário, a mensagem de erro deve ser exibida na tela.

### 13 - Crie a página home, com a cotação do Bitcoin em várias moedas

Essa página é onde será possível ver a conversão de Bitcoin em outras moedas.

Ao carregar, a página deve fazer uma requisição `GET` para o endpoint `/api/crypto/btc` para obter os valores de conversão.

A página deve conter um input onde será possível digitar um valor em Bitcoins e quatro campos com os valores correspondentes em `USD`, `BRL`, `EUR` e `CAD`. Ao digitar o valor no input, os quatros campos devem ser atualizados.

### 14 - Crie uma página para atualizar o valor da cotação de uma moeda

A página deverá conter:

- Um select onde deverá ser possível selecionar a moeda cuja cotação se deseja atualizar. Os valores possíveis devem ser `BRL`, `EUR` e `CAD`;

- Após ter selecionado uma moeda, um texto deve mostrar o valor atual da cotação;

- Um input onde o novo valor de cotação poderá ser digitado;

- Um botão "Atualizar". Ao clicar nesse botão, deve ser feita uma requisição `POST` para o endpoint `/api/crypto/btc`, com o novo valor da moeda selecionada. Caso a requisição seja bem sucedida, a página deverá ser redirecionada para a **home**. Caso contrário, a mensagem de erro retornada pela API deve ser exibida na página;

- Um botão "Voltar" que, quando clicado, redireciona para a **home**, sem atualizar o valor da moeda selecionada.

## Comentários

* Fique à vontade para usar as boas práticas que entender necessárias para o projeto, como escolhas de arquitetura, uso de testes, linters, documentação, etc.