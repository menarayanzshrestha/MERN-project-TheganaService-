const express = require('express');

var router = express.Router();

const  signupController  = require('../controllers/signupController');
const  loginController  = require('../controllers/loginController');
const  otpController  = require('../controllers/otpController');
const  verificationController  = require('../controllers/verificationController');
const  changePasswordController  = require('../controllers/changePasswordController');
const  changeRoleController  = require('../controllers/changeRoleController');

const checkAuth = require('../middlewares/checkAuth');
const { isAdmin, isDeveloper, isManager }= require('../middlewares/checkRole');

router.post('/signup', checkAuth, isAdmin, signupController);

router.post('/login', loginController);

router.post('/login/otp', otpController);

router.post('/verification/:verificationToken', verificationController);

router.post('/user/changepassword/:_id', checkAuth, changePasswordController);

router.post('/user/changerole', checkAuth, isAdmin, changeRoleController);

module.exports = router;