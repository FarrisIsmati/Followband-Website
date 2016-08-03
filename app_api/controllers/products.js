var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.getProducts = function(req, res) {
	Product.find(function(err, products){
		if (err){
			res.send(err);
		}
		res.json(products);
	});

};


