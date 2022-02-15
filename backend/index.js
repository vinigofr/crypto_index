const express = require('express');
const helloWorldRoutes = require('./Routes/helloWorldRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/helloworld', helloWorldRoutes);

app.listen(4000, () => console.log(`Server open on port ${PORT}`));
