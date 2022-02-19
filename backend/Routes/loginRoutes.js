const router = require('express').Router();
const { loginValidation } = require('../middlewares/loginValidation');
const loginController = require('../controllers/loginController');

router.post('/', loginValidation, loginController.login);

module.exports = router;
