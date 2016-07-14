var mongoose  = require('mongoose');
var User      = mongoose.model('User');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createCart = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private cart"
    });
  } else {
    var user = User.findById(req.payload._id)
    req.user.data.cart = cart;

    //This part will be the entered data from adding a product to the
    //cart
    cart.product = req.body.product;
    cart.quantity = req.body.quantity;

    req.user.save(function(error, user){
    if (error){
      return res.
        status(status.INTERNAL_SERVER_ERROR).
        json({ error: error.toString() });
    }
    return res.json({ user: user });
  });
  }
  // try {
  //   var cart = req.body.data.Cart;
  // } catch(err) {
  //   return res.
  //     status(status.BAD_REQUEST).
  //     json({ error: 'No cart specified' });
  // }
};