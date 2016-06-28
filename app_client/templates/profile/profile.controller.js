'use strict';

(function(){

var app = angular.module("followapp.ProfileCtrl", []);

app.controller('ProfileCtrl', function($scope, $http, $window, $location, authService){
    var auth = authService;

    //Need to figure out how to move isLoggedIn an logout to the services
    // $scope.isLoggedIn = function() {
    //   var token = auth.getToken();
    //   var payload;

    //   if(token){
    //     payload = token.split('.')[1];
    //     payload = $window.atob(payload);
    //     payload = JSON.parse(payload);

    //     return payload.exp > Date.now() / 1000;
    //   } else {
    //     return false;
    //   }
    // };

    $scope.logout = function() {
      if (auth.isLoggedIn()){
        console.log('Loging out');
        $window.localStorage.removeItem('mean-token');
      }
    };

    $scope.credentialsReg = {
      name : "",
      email : "",
      password : "",
      passwordconfirm : ""
    };

    $scope.credentialsLog = {
      email : "",
      password : "",
    };

    $scope.onSubmitRegister = function () {
      console.log($scope.credentialsReg)

      if ($scope.credentialsReg.password != $scope.credentialsReg.passwordconfirm) {
        console.log('passwords dont match');
        return
      } else {
        console.log('Submitting registration');
        auth.register($scope.credentialsReg)
          .error(function(err){
            alert('err');
        })
        .then(function(){
          $location.path('/tab/main');
        });
      }

    };

    $scope.onSubmitLogin = function () {
        auth.login($scope.credentialsLog)
        .error(function(err){
          alert(err);
          return
        })
        .then(function(){
          $location.path('/tab/main');
        });
    };

  });

}());