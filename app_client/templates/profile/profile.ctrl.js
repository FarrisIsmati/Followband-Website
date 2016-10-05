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
       $scope.lock = false;

      if ($scope.credentialsReg.password != $scope.credentialsReg.passwordconfirm) {
        $scope.lock = true;
        $timeout(function() {
           $scope.loginBtn = "generic-button-default";
           $scope.lock = false;
        }, 3000);    
        return
      } 
      if (authService.passwordCompatible($scope.credentialsReg.password)){
        console.log('Submitting registration');
        authService.register($scope.credentialsReg)
          .error(function(err){
            alert('Dude sorry!!! There was an error during your registration.');  
        })
        .then(function(){
          $location.path('/regSuccess');
        });
      } else {
        alert('Hey! Try harder. Password length must be greater than 6 and must contain at least one uppercase letter, one lowercase letter, and a number.'); 
        return 
      }
    };

    $scope.onSubmitLogin = function (form) {
      $scope.lock = false;

      authService.login($scope.credentialsLog)
      .error(function(err){
        $scope.loginBtn = "generic-button-danger"
        $scope.lock = true;
        $timeout(function() {
           $scope.loginBtn = "generic-button-default";
           $scope.lock = false;
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