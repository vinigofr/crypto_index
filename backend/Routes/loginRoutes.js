const router = require('express').Router();
const { loginValidation } = require('../middlewares/loginValidation');

router.post('/', loginValidation, (_, res) => res.json({ message: 'Login Route' }));

module.exports = router;
