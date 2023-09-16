const router = require('express').Router();
const { addUser } = require('../controllers/users');
const { addUserValidation } = require('../utils/validation');

router.post('/', addUserValidation, addUser);

module.exports = router;
