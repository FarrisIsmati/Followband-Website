var express = require('express');
var router = express.Router()
var jwt 	= require('express-jwt');
var auth = jwt({  	secret: 'MYSECRET',
  					userProperty: 'payload'
  				});

var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');
var ctrlCart = require('../controllers/shoppingCart');

// profile
router.get('/tab/profile', auth, ctrlProfile.profileRead);

// AUTHENTICATION
// REGISTER
router.post('/tab/register', ctrlAuth.register);

// LOGIN
router.post('/tab/login', ctrlAuth.login);

// CREATECART
router.get('/tab/cart', ctrlCart.createCart);

module.exports = router;