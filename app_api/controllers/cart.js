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

module.exports.putLineItem = function(req, res) {
  console.log('ITS A PUT !!!');
  // Find by UserID Supplied by token on local storage
  User.findById(req.body[1], function (err, user) {
    if (user){
      for (var item in user.cart){
        if (req.body[0].lineItemID === user.cart[item].lineItemID){
          user.cart[item].quantity += 1;
        }
      } 
      user.markModified('cart');
      user.save(function(err) {
        res.status(200);
        console.log('Updated item quantity in cart ' + req.body[0].lineItemID);
      });
    } else {
      res.status(404).json(err);
      return;
    }
  });
};

module.exports.deleteLineItem = function(req, res) {
  // Find by UserID Supplied by token on local storage
  User.findById(req.query.payload[1], function (err, user) {
    if (user){
      for (var item in user.cart){
        if (req.query.payload[0] === user.cart[item].lineItemID){
          user.cart.splice(item,1);
        }
      } 
      user.markModified('cart');
      user.save(function(err) {
        res.status(200);
        console.log('Deleted item item in cart ' + req.query.payload[0]);
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

