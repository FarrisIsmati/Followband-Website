var mongoose 	= require('mongoose');
//var nev 		= require('email-verification')(mongoose);
var dbURI 		= 'mongodb://localhost/followdata';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
  var User     	= mongoose.model('User');

 //  	nev.configure({
	//     verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
	//     persistentUserModel: User,
	//     tempUserCollection: 'myawesomewebsite_tempusers',
	 
	//     transportOptions: {
	//         service: 'Gmail',
	//         auth: {
	//             user: 'myawesomeemail@gmail.com',
	//             pass: 'mysupersecretpassword'
	//         }
	//     },
	//     verifyMailOptions: {
	//         from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
	//         subject: 'Please confirm account',
	//         html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
	//         text: 'Please confirm your account by clicking the following link: ${URL}'
	//     }
	// }, function(error, options){
	// });

	// var TempUser = require('../models/tempUserModel');

	// nev.configure({
	//     tempUserModel: TempUser
	// }, function(error, options){
	// });
	 
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// SCHEMA DECLERATION

require('../models/user');
//require('../models/tempUserModel');
require('../models/product');
// require('../models/order');
//require('../models/userCart');