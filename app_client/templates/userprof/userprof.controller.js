'use strict';

(function(){

var app = angular.module("followapp.UserProfCtrl", []);

app.controller('UserProfCtrl', function($scope, $location, dataService){
   
    var data = dataService;

    data.getProfile()
      .success(function(data) {
        //vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

  });

}());