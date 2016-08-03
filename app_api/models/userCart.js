// User order line cart
var mongoose 	= require( 'mongoose' );
var userRequire	= require('../models/user').User;

var Schema 		= mongoose.Schema;

var cartSchema = new Schema({
	_userid: {
		type: Number,
		ref: 'User',
		unique: true,
		required: false
	},
	order: {
		type: Number,
		unique: true,
		required: false
	},
	product: {
		type: Number,
		// ref: link to Product SchemaID populate
		required: false //should be true
	},
	quantity: {
		type: Number,
		default: 1,
		min: 1
	},
	subTotal: {
		type: Number,
		required: false
	}
})

// var Cart = mongoose.model('Cart', cartSchema);

// module.exports = {
// 	Cart: Cart
// }