var passport  = require('passport');
var mongoose  = require('mongoose');
var User      = mongoose.model('User');

module.exports.postLineItem = function(req, res) {
  // Find by UserID Supplied by token on local storage
  User.findById(req.body[1], function (err, user) {
    if (user){
      user.cart.push(req.body[0]);

      user.save(function(err) {
        res.status(200);
        console.log('Added item to cart ' + req.body[0].productName);
      });
    } else {
      res.status(404).json(err);
      return;
    }
  });
};

module.exports.getUserCart = function(req, res) {
  // Find by UserID Supplied by token on local storage

  User.findById(req.query.payload, function (err, user) {
    if (user){
      res.status(200).json(user.cart)
    } else {
      res.status(404).json(err);
      return;
    }
  });
};