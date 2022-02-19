const loginService = require('../service/loginService');

const login = async (req, res) => {
  const { email } = req.body;
  const token = loginService.login(email);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
