var mongoose 	= require( 'mongoose' );
var jwt 		= require('jsonwebtoken');
var crypto	 	= require('crypto');

var Schema 		= mongoose.Schema;

var TempUserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	shipping: {
		shippingAddress: [{addressLine1: String, addressLine2: String,
			city: String, country: String, state: String,
			zip: Number, }],
		required: false
	},
	dateCreated: {
		type: Date,
		required: true
	},
	orderHistory: {
		type: [],
		required: false
	},
	cart: { // If we want to reference cart in another schema type: [{type: Schema.Types.ObjectId, ref: 'Cart'}]
		type: [],
		required: false
	},
	emailURL: {
		type: String
	},
	hash: String,
	salt: String
})

// Use stripe
// userSchema.methods.storeCreditCard = function(password){
// };
TempUserSchema.methods.getDate = function(){
	var creationDate = new Date();
  	this.dateCreated = creationDate.setDate(creationDate.getDate());
};

TempUserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

TempUserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

TempUserSchema.methods.generateJWT = function(user) {
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

var TempUser = mongoose.model('TempUser', TempUserSchema);

module.exports = TempUser;