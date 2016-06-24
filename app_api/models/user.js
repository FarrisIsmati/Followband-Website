var mongoose 	= require( 'mongoose' );
var jwt 		= require('jsonwebtoken');
var crypto	 	= require('crypto');


var Schema 		= mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: false
	},
	name: {
		type: String,
		required: false
	},
	hash: String,
	salt: String
})

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function(user) {
	var expiry = new Date();
  	expiry.setDate(expiry.getDate() + 7);

  	return jwt.sign({
  		_id 	: this._id,
  		name 	: this.name,
  		email 	: this.email,
  		exp: parseInt(expiry.getTime() / 1000)
  	},
  	"MYSECRET")
};

mongoose.model('User', userSchema);