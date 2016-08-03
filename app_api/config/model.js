var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/followdata';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// SCHEMA DECLERATION

require('../models/user');

require('../models/product');
// require('../models/order');
//require('../models/userCart');