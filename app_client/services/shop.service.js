'use strict';

(function() {

  var app = angular.module("ShopService", []);
  app.service('shopService', function shopService ($http, dataService) {
    var currentProduct = '';

    var menuButtons = [
                      {header: "ORIGINAL", isActive: true},
                      {header: "GREEK", isActive: false}
                     ];

    if (!dataService.retrieveLocal('navbarBracelet')){
      dataService.storeToLocal('navbarBracelet', menuButtons);
    } else {
      menuButtons = dataService.retrieveLocal('navbarBracelet');
    }

    return {
      returnSetMenuState : function(){
        return menuButtons;
      },
      // Get and set individual products
      setCurrentProduct : function (selectedProduct){
        currentProduct = selectedProduct;

        for (var product in menuButtons){
          if (selectedProduct.header === menuButtons[product].header){
            menuButtons[product]. isActive = true;
          } else {
            menuButtons[product]. isActive = false;
          }
        }
        dataService.storeToLocal('navbarBracelet', menuButtons);
      },
      returnCurrentProduct : function (){
        return currentProduct;
      }
    };
  });


})();