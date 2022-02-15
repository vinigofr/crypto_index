const express = require('express');
const helloWorldRoutes = require('./Routes/helloWorldRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/helloworld', helloWorldRoutes);

app.listen(PORT, () => console.log(`Server open on port ${PORT}`));

module.exports = { app };
