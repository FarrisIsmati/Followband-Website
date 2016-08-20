'use strict';

(function () {

var app = angular.module("AuthService", []);

  app.service('authService', authentication);

  function authentication ($http, $window) {

    var parseToken = function(token){
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return payload;
    }

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload = parseToken(token);

      if(token){
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = parseToken(token);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
      return $http.post('/follow/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/follow/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      if (isLoggedIn()){
        console.log('Loging out');
        $window.localStorage.removeItem('mean-token');
      }
    };

    //Checks to see if password contains at least 1 lower and upper case a number and a minimum of 7 characters
    var passwordCompatible = function(password) {
      var re_num = /(?=.*[0-9])/.test(password);
      var re_low = /(?=.*[a-z])/.test(password);
      var re_up = /(?=.*[A-Z])/.test(password);

      if ((password.indexOf(' ') <= 0) && (re_num) && (re_low) && (re_up) && (password.length > 6)){
        return true;
      }
      return false;
    };

    return {
          parseToken : parseToken,
          currentUser : currentUser,
          saveToken : saveToken,
          getToken : getToken,
          isLoggedIn : isLoggedIn,
          register : register,
          login : login,
          logout : logout,
          passwordCompatible : passwordCompatible
    };
  }

})();