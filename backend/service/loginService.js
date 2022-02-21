const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const login = (email) => {
  const token = jwt.sign(
    { email },
    JWT_SECRET,
    { expiresIn: '7d' },
  );

  return token;
};

module.exports = {
  login,
};
