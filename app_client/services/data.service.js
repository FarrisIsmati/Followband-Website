'use strict';

(function() {

  var app = angular.module("followapp.dataService", []);

  app.service('dataService', dataService);

    function dataService ($http, authService) {
    var auth = authService;
    var getProfile = function () {
      return $http.get('/tab/profile', {
        headers: {
          Authorization: 'Bearer '+ auth.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();