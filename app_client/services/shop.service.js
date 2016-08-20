'use strict';

(function() {

  var app = angular.module("ShopService", []);
  app.factory('shopService', function shopService ($http, dataService) {
    var currentProduct = '';

    var menuButtons = [{header: "BEADED", isActive: true},
                      {header: "LEATHER", isActive: false}
                      ];

    return {
      returnSetMenuState : function(){
        return menuButtons;
      },
      // Get and set individual products
      setCurrentProduct : function (selectedProduct){
        currentProduct = selectedProduct;
      },
      returnCurrentProduct : function (){
        return currentProduct;
      }
    };
  });


})();