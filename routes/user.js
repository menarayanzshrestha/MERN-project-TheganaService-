const express = require('express');

var router = express.Router();

const  signupController  = require('../controllers/signupController');
const  loginController  = require('../controllers/loginController');
const  otpController  = require('../controllers/otpController');

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/login/otp', otpController);

module.exports = router;