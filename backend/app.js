const express = require('express');

const app = express();
app.use(express.json());

// Source: https://stackoverflow.com/questions/53048642/node-js-handle-body-parser-invalid-json-error/53049009
// Handle syntax error from body
app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: {
        message: 'Verifique o corpo da requisição',
        details: 'Erro de sintaxe',
      },
    });
  }
  return next();
});

const helloWorldRoutes = require('./Routes/helloWorldRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const cryptoRoutes = require('./Routes/cryptoRoutes');
const notFoundRoute = require('./Routes/notFoundRoute');

app.use('/helloworld', helloWorldRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/crypto/btc', cryptoRoutes);
// Source:
// https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes
app.use(notFoundRoute);

module.exports = { app };
