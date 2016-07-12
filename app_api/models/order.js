// User order line cart

var mongoose 	= require( 'mongoose' );
var User      	= mongoose.model('User');

var Schema 		= mongoose.Schema;

var order = new Schema({
	shipping: {
		shippingAddress: [{addressLine1: String, addressLine2: String,
			city: String, country: String, state: String,
			zip: Number, }],
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	dateCreated: {
		type: Date,
		required: true
	}
})


order.methods.getDate = function(){
	var creationDate = new Date();
  	this.dateCreated = creationDate.setDate(creationDate.getDate());
};

mongoose.model('order', orderSchema);