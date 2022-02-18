const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    jwt.verify(authorization, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = {
  verifyToken,
};
