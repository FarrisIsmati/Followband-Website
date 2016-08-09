// User order line cart
var mongoose 	= require( 'mongoose' );
var userRequire	= require('../models/user').User;

var Schema 		= mongoose.Schema;

var lineItemSchema = new Schema({
	_productid: {
		type: Number,
		ref: 'Product',
		required: true
	},
	coordinates: {
		type: String,
		required: false
	},
	size: {
		type: String,
		required: true 
	},
	quantity: {
		type: Number,
		default: 1,
		min: 1
	}
})

// var Cart = mongoose.model('Cart', cartSchema);

// module.exports = {
// 	Cart: Cart
// }