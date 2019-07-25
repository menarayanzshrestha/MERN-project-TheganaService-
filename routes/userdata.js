const express = require('express');

var router = express.Router();

const checkAuth = require('../middlewares/checkAuth');

const  userDataController  = require('../controllers/userdata/userDataController');

router.get('/myprofile', checkAuth,  userDataController);

module.exports = router;