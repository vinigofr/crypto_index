const express = require('express');

const app = express();

// Routes
app.use(express.json());

const helloWorldRoutes = require('./Routes/helloWorldRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const cryptoRoutes = require('./Routes/cryptoRoutes');

app.use('/helloworld', helloWorldRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/crypto/btc', cryptoRoutes);

module.exports = { app };
