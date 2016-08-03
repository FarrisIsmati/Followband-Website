var mongoose 	= require( 'mongoose' );

var Schema 		= mongoose.Schema;

var productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	imgLink: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: true
	},
	style: {
		type: String,
		required: true
	}
})

var Product = mongoose.model('Product', productSchema);

module.exports = Product;