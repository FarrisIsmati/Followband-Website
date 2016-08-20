'use strict';

(function(){

var app = angular.module("UserProfCtrl", []);

app.controller('UserProfCtrl', function($scope, $location, dataService){
    // Declare the data service
    var data = dataService;

    $scope.user

    // Get data
    data.getProfile()
      .success(function(data) {
      	$scope.user = data
      })
      .error(function (e) {
        console.log(e);
      });

  });

}());