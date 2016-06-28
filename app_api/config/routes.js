var express = require('express');
var router = express.Router()
var jwt 	= require('express-jwt');
var auth = jwt({  	secret: 'MYSECRET',
  					userProperty: 'payload'
  				});

var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');

// profile
router.get('/tab/profile', auth, ctrlProfile.profileRead);

// AUTHENTICATION
// REGISTER
router.post('/tab/register', ctrlAuth.register);

// LOGIN
router.post('/tab/login', ctrlAuth.login);

module.exports = router;