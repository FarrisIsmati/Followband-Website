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
var ctrlCart = require('../controllers/cart');


// profile
router.get('/follow/profile', auth, ctrlProfile.profileRead);

// -----AUTHENTICATION-----
// REGISTER
router.post('/follow/register', ctrlAuth.register);

// LOGIN
router.post('/follow/login', ctrlAuth.login);

// -----CART-----
// POST LINE ITEM
router.post('/follow/cart', ctrlCart.postLineItem);

// PUT LINE ITEM
router.put('/follow/cart', ctrlCart.putLineItem);

// GET UNIQUE ID FOR LINE ITEMS
router.get('/follow/cart', ctrlCart.getUserCart);

// -----SHOP-----
// GET PRODUCTS
router.get('/follow/products', ctrlProducts.getProducts);

module.exports = router;