'use strict';

(function () {

var app = angular.module("followapp.cartService", []);

  app.service('cartService', cart);

  function cart ($http, $window, authService, dataService) {
    // Declare additional services
    var authService = authService;
    var dataService = dataService;

    // If the user is logged in
    var pushToCartDB = function(lineItem, token){
      var payload = authService.parseToken(token);
      dataService.postLineItem([lineItem, payload._id]);
    }

    var currentSessionCart = []; 
    var currentSessionCart2 = []; 

    // If the user is not logged in
    var pushToCartLocal = function(lineItem){
      if (localStorage.getItem('localCart')){
        var localLength = localStorage.getItem('localCart').length - 1;

        currentSessionCart2.push(lineItem);

        var objectToString = JSON.stringify(currentSessionCart2).substring(1);
        
        var insert = objectToString.slice(0, -1);
        
        var output = [localStorage.getItem('localCart').slice(0, localLength) + ',', insert, localStorage.getItem('localCart').slice(localLength)].join('');

        localStorage.setItem('localCart', output);

      } else {

        currentSessionCart.push(lineItem);

        localStorage.setItem('localCart', JSON.stringify(currentSessionCart));

      }
    }

    // Clears the cart
    var removeFromCartLocal = function(){
      localStorage.removeItem('localCart');
    }

    return {
      pushToCartDB : pushToCartDB,
      pushToCartLocal : pushToCartLocal,
      removeFromCartLocal : removeFromCartLocal

    };
  }

})();