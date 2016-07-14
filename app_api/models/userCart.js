// User order line cart

var mongoose 	= require( 'mongoose' );

var Schema 		= mongoose.Schema;

var cartSchmea = new Schema({
	order: {
		unique: true,
		required: false
	},
	product: {
		type: mongoose.Schema.Types.ObjectId
		required: false //should be true
	}
	quantity: {
		type: Number,
		default: 1,
		min: 1
	}
	subTotal: {
		type: Number,
		required: false
	}
})


// cartSchema.methods.lol = function() {

// };

mongoose.model('Cart', cartSchema);