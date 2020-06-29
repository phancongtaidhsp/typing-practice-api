const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const userValidate = require('../validate/user.validate');

router.get('/getProfile', controller.get);

router.put('/update' , controller.update)

module.exports = router;