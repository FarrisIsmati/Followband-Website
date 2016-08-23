'use strict';

(function(){

var app = angular.module("RegSuccessCtrl", []);

app.controller('RegSuccessCtrl', function($scope, $location, $timeout, dataService){
    $scope.user

    // Get data
    dataService.getProfile()
      .success(function(data) {
        $scope.user = data

        $timeout(function() {
           $location.path('/main');
        }, 5000);        
      })
      .error(function (e) {
        $location.path('/main');
        console.log(e);
      });

  });
}());