const express = require('express');

// Routes
const helloWorldRoutes = require('./Routes/helloWorldRoutes');
const loginRoutes = require('./Routes/loginRoutes');

// Middlewares
const { loginValidation } = require('./middlewares/loginValidation');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/helloworld', helloWorldRoutes);
app.use('/api/login', loginValidation, loginRoutes);

app.listen(PORT, () => console.log(`Server open on port ${PORT}`));

module.exports = { app };
