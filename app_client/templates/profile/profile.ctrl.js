'use strict';

(function(){

var app = angular.module("ProfileCtrl", []);

app.controller('ProfileCtrl', function($scope, $http, $window, $location, $state, $rootScope, $timeout, authService){
    $scope.loginBtn = "generic-button-default"
    $scope.regBtn = "generic-button-default"

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

    $scope.isLoggedIn = function() {
      var token = authService.getToken();
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

    $scope.logout = function() {
      if (authService.isLoggedIn()){
        console.log('Loging out');
        $location.path('/main');
        $window.localStorage.removeItem('mean-token');
      }
    };

    $scope.onSubmitRegister = function () {
      if ($scope.credentialsReg.password != $scope.credentialsReg.passwordconfirm) {
        console.log('passwords dont match');
        return
      } 
      if (authService.passwordCompatible($scope.credentialsReg.password)){
        console.log('Submitting registration');
        authService.register($scope.credentialsReg)
          .error(function(err){
            $scope.regBtn = "generic-button-danger"
            $timeout(function() {
               $scope.regBtn = "generic-button-default";
            }, 3000);    
        })
        .then(function(){
          $location.path('/regSuccess');
        });
      } else {
        console.log('password doesnt meet requirements');
        return 
      }
    };

    var history = [];

    $rootScope.$on('$stateChangeSuccess', function() {
        //if length of history > 5 then remove
        history.push($location.$$path);
        if (history.length > 5){
          history.shift();
        }
    });

    $scope.onSubmitLogin = function (form) {
      authService.login($scope.credentialsLog)
      .error(function(err){
        $scope.loginBtn = "generic-button-danger"
        $timeout(function() {
           $scope.loginBtn = "generic-button-default";
        }, 3000);        
        return err.problem;
      })
      .then(function(){
        $location.path('/shop');
      });
  };

  $scope.authLogin = true;

  $scope.changeAuthLogin = function(){
    if ($scope.authLogin){
        $scope.authLogin = false;
    } else {
      $scope.authLogin = true;
    }
  }

  $scope.returnAuthLogin = function(){
      return $scope.authLogin;
  }


  });

}());