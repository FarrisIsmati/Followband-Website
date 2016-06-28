var express 		= require("express");
var bodyParser 		= require("body-parser");
var passport 		= require("passport");
var cookieParser 	= require("cookie-parser");
var passportLocal 	= require("passport-local").Strategy;
var mongoose 		= require("mongoose");
var logger 			= require('morgan');
var path 			= require('path');
var flash 			= require('connect-flash');

var app 			= express();

var port = process.env.PORT || 8080; 	//set our port

//Require db config
require('./app_api/config/model.js');

//Require passport config
require('./app_api/config/passport.js');

//Require routes config
var routesAPI = require('./app_api/config/routes.js')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(flash());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/', routesAPI);
app.use(function(req, res) {
    res.sendfile(__dirname + '/app_client/index.html');
});

app.listen(port);
console.log('Flying on port: ' + port);

module.exports = app;