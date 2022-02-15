const Joi = require('joi');

// References:
// https://joi.dev/api/?v=17.6.0
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error) {
    return res.status(400).json({
      message: 'Campos inválidos',
    });
  }

  return next();
};

module.exports = {
  loginValidation,
};
