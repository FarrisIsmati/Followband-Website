var express = require('express');
var router = express.Router()
var jwt 	= require('express-jwt');
var auth = jwt({  	secret: 'MYSECRET',
  					userProperty: 'payload'
  				});

var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// AUTHENTICATION
// REGISTER
router.post('/register', ctrlAuth.register);

// LOGIN
router.post('/login', ctrlAuth.login);

module.exports = router;