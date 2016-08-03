// var mongoose  = require('mongoose');
// var User      = mongoose.model('User');

// var sendJSONresponse = function(res, status, content) {
//   res.status(status);
//   res.json(content);
// };

// module.exports.createCart = function(req, res) {
//           //payload._id <--should be req.payload._id just testing
//   if (!req.body.email) {
//     res.status(401).json({
//       "message" : "UnauthorizedError: private cart"
//     });
//   } else {//User.findByID(req.payload._id)  <--should be req.payload._id
//     User.findOne({email: req.body.email}, function(err,user){
//       console.log(user);
//       var cart = user.cart.userCart; 
//       cart.product = req.body.product;
//       cart.quantity = req.body.quantity;
//       user.save(function(error, user){
//       if (error){
//           return res.
//             status(status.INTERNAL_SERVER_ERROR).
//             json({ error: error.toString() });
//         }
//         return res.json({ user: user });
//       });
//     })








  //   Remove this 
  //   req.user.data.cart = cart;

  //   //This part will be the entered data from adding a product to the
  //   //cart
  //   cart.product = req.body.product;
  //   cart.quantity = req.body.quantity;

  //   req.user.save(function(error, user){
  //   if (error){

  //     return res.
  //       status(status.INTERNAL_SERVER_ERROR).
  //       json({ error: error.toString() });
  //   }
  //   return res.json({ user: user });
  // });
  }
  // try {
  //   var cart = req.body.data.Cart;
  // } catch(err) {
  //   return res.
  //     status(status.BAD_REQUEST).
  //     json({ error: 'No cart specified' });
  // }
};