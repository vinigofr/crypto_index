const express = require('express');

// Routes
const helloWorldRoutes = require('./Routes/helloWorldRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const cryptoRoutes = require('./Routes/cryptoRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/helloworld', helloWorldRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/crypto/btc', cryptoRoutes);

app.listen(PORT, () => console.log(`Server open on port ${PORT}`));

module.exports = { app };
