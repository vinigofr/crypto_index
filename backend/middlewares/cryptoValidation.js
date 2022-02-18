const Joi = require('joi');

// References:
// https://joi.dev/api/?v=17.6.0
// https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs
const schema = Joi.object({
  value: Joi.number().integer().positive().required(),
});

const verifyCurrencyValue = (req, res, next) => {
  const { value } = req.body;
  const { error } = schema.validate({ value });

  if (error) {
    return res.status(400).json({ message: 'Valor inválido' });
  }

  return next();
};

const verifyAllowedCurrency = (req, res, next) => {
  const { currency } = req.body;
  const currencySchema = {
    BRL: true,
    EUR: true,
    CAD: true,
  };

  if (!currencySchema[currency]) {
    return res.status(400).json({ message: 'Moeda inválida' });
  }

  return next();
};

module.exports = {
  verifyCurrencyValue,
  verifyAllowedCurrency,
};
