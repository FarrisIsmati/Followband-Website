'use strict';

(function(){

var app = angular.module("ProfileCtrl", []);

app.controller('ProfileCtrl', function($scope, $http, $window, $location, $state, $rootScope, authService){
    var auth = authService;

    //Need to figure out how to move isLoggedIn an logout to the services
    $scope.isLoggedIn = function() {
      var token = auth.getToken();
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
      if (auth.isLoggedIn()){
        console.log('Loging out');
        $location.path('/main');
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
      //If passwords don't match end func
      //If user already exists return error
      //All fields required handled in the view

      //Need
      //Passwords must meet min requirements
      if ($scope.credentialsReg.password != $scope.credentialsReg.passwordconfirm) {
        console.log('passwords dont match');
        return
      } 
      if (auth.passwordCompatible($scope.credentialsReg.password)){
        console.log('Submitting registration');
        auth.register($scope.credentialsReg)
          .error(function(err){
            alert(err.problem);
        })
        .then(function(){
          $location.path('/profile');
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

    $scope.onSubmitLogin = function () {
        auth.login($scope.credentialsLog)
        .error(function(err){
          alert(err.problem);
          return
        })
        .then(function(){
          $location.path('/main');
        });
    };



  });

}());