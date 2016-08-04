'use strict';

(function() {

  var app = angular.module("followapp.dataService", []);

  app.service('dataService', dataService);

    function dataService ($http, authService) {
    // Declare the authentication service
    var auth = authService;

    // Get user profile data from db
    var getProfile = function () {
      return $http.get('/tab/profile', {
        headers: {
          Authorization: 'Bearer '+ auth.getToken()
        }
      });
    };

    // Get products from db
    var getProducts = function () {
      return $http.get('/tab/products');
    };

    var currentProduct = '';

    // Get the navbar state

    var menuButtons = [{header: "BEADED", isActive: true},
                      {header: "LEATHER", isActive: false}
                      ];

    var returnSetMenuState = function(){
      return menuButtons;
    }

    // Get and set individual products 

    var setCurrentProduct = function (selectedProduct){
      currentProduct = selectedProduct;
    }

    var returnCurrentProduct = function (){
      return currentProduct;
    }

    return {
      getProfile : getProfile,
      getProducts: getProducts,
      returnSetMenuState : returnSetMenuState,
      setCurrentProduct : setCurrentProduct,
      returnCurrentProduct : returnCurrentProduct
    };
  }


})();