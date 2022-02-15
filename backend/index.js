const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/helloworld', (_, res) => res.send('Hello World!'));

app.listen(4000, () => console.log(`Server open on port ${PORT}`));
