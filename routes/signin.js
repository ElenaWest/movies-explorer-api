const router = require('express').Router();
const { login } = require('../controllers/users');
const { loginValidation } = require('../utils/validation');

router.post('/', loginValidation, login);

module.exports = router;
