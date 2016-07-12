// User order line cart

var mongoose 	= require( 'mongoose' );

var Schema 		= mongoose.Schema;

var product = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		products: [],
		required: false
	}
	price: {
		type: Number,
		required: true
	}
})


// productSchema.methods.lol = function() {

// };

mongoose.model('product', productSchema);