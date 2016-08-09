'use strict';

(function() {

  var app = angular.module("followapp.shopService", []);
  app.service('shopService', shopService);

  function shopService ($http, authService) {
    // Get the navbar state

    var currentProduct = '';

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
      returnSetMenuState : returnSetMenuState,
      setCurrentProduct : setCurrentProduct,
      returnCurrentProduct : returnCurrentProduct
    };
  }


})();