var passport  = require('passport');
var mongoose  = require('mongoose');
var User      = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user){

      console.log('This user ' + req.body.email + ' already exists ::: Error authentication.js');
      res.status(404).json({problem: 'This user ' + req.body.email + ' already exists'});

    } else {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.getDate(); 

        user.save(function(err) {
          var token;
          token = user.generateJWT();
          res.status(200);
          res.json({
            "token" : token
          });
          console.log('Created new user ' + req.body.email);
        });
    }
  });
};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      console.log('There was an error ' + err);
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJWT();
      res.status(200);
      res.json({
        "token" : token
      });
      console.log('User ' + user.email + ' logged in');
    } else {
      // If user is not found
      console.log('Incorrect username or password');
      res.status(401).json({problem: 'Incorrect username or password'});
    }
  })(req, res);

};