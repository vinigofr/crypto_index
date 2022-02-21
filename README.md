<h1 style="text-align: center">Boas vindas ao projeto Crypto Index!<h1>

Para o desenvolvimento desde projeto, foi utilizada a API externa da [**CoinDesk**](https://www.coindesk.com/).


# Sumário

- [Requisitos necessários](#requisitos)
- [Como rodar em sua maquina](#como-rodar-em-sua-maquina)
- [Endpoints da aplicação](#endpoints)

# Requisitos:

## Para rodar o projeto localmente em sua maquina, será necessário ter instalado:
### 1. Node.Js LTS
### 2. NPM (Node Package Manager)
### 3. Git (Ferramenta de versionamento)
---
# Como rodar em sua maquina

## Passo a passo de como inicializar a aplicação:
### 1. Crie uma pasta local e utilize o nome que desejar. Abra-a com o terminal do seu sistema operacional.
### 2. Digite `git clone git@github.com:vinigofr/crypto_index.git` e aguarde o download.

# Endpoints:

### 1. GET - `http://localhost:4000/helloworld` -> Endpoint teste para verificar se o servidor esta inicializado.

### 2. POST - `http://localhost:4000/api/login` -> Endpoint de login que deve receber **email** e **senha** validos para retornar um token.

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
- Devem ser também enviados os dados currency e value, onde currency eh o código da moeda e value eh o valor.
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
