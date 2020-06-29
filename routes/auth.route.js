const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const userValidate = require('../validate/user.validate');

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

router.get('/logout', controller.logout);

router.get('/register', controller.create);

router.post('/register', userValidate.validateUserInput, userValidate.postCreate, controller.postCreate);

module.exports = router;