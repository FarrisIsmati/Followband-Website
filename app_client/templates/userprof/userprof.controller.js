'use strict';

(function(){

var app = angular.module("followapp.UserProfCtrl", []);

app.controller('UserProfCtrl', function($scope, $location, dataService){
   
    var data = dataService;

    $scope.user

    data.getProfile()
      .success(function(data) {
      	$scope.user = data
      })
      .error(function (e) {
        console.log(e);
      });

  });

}());