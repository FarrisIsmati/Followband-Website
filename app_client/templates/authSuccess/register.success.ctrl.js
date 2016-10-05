'use strict';

(function(){

var app = angular.module("RegSuccessCtrl", []);

app.controller('RegSuccessCtrl', function($scope, $location, $timeout, dataService){
    $scope.user

    // Get data
    dataService.getProfile()
      .then(function(data) {
        $scope.user = data

        $timeout(function() {
           $location.path('/main');
        }, 5000);        
      }, function (e) {
        $location.path('/main');
        console.log(e);
      });

  });
}());