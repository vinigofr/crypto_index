const Joi = require('joi');
const JoiSchemas = require('../utils/joiMessageSchema');

// References:
// https://joi.dev/api/?v=17.6.0
// https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs
const schema = Joi.object({
  currency: Joi.string().required(),
  value: Joi.number().integer().positive().required(),
});

const updateCurrencyFieldsValidation = (req, res, next) => {
  const { currency, value } = req.body;
  const { error } = schema.validate({ currency, value });

  if (error) {
    return res.status(400).json({
      message: 'Campos inválidos',
      details: JoiSchemas[error.details[0].type],
    });
  }

  return next();
};

module.exports = {
  updateCurrencyFieldsValidation,
};
