const router = require('express').Router();
const { getUserInfo, editUserData } = require('../controllers/users');
const { editUserDataValidation } = require('../utils/validation');

router.get('/me', getUserInfo);

router.patch('/me', editUserDataValidation, editUserData);

module.exports = router;
