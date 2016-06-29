(function () {

var app = angular.module("followapp.authService", []);

  app.service('authService', authentication);

  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
      return $http.post('/tab/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/tab/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      if (isLoggedIn()){
        console.log('Loging out');
        $window.localStorage.removeItem('mean-token');
      }
      
    };

    return {
          currentUser : currentUser,
          saveToken : saveToken,
          getToken : getToken,
          isLoggedIn : isLoggedIn,
          register : register,
          login : login,
          logout : logout
    };
  }

})();