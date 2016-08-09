var express = require('express');
var router = express.Router()
var jwt 	= require('express-jwt');
var auth = jwt({  	secret: 'MYSECRET',
  					userProperty: 'payload'
  				});

var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');
//var ctrlCart = require('../controllers/shoppingCart');
var ctrlProducts = require('../controllers/products');

// profile
router.get('/follow/profile', auth, ctrlProfile.profileRead);

// AUTHENTICATION
// REGISTER
router.post('/follow/register', ctrlAuth.register);

// LOGIN
router.post('/follow/login', ctrlAuth.login);

// GET PRODUCTS
router.get('/follow/products', ctrlProducts.getProducts);

// CREATE CART
//router.post('/follow/cart', ctrlCart.createCart);

module.exports = router;