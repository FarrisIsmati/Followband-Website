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

    var pushLineItem = function(lineItem){
      // Declare token
      var token = authService.getToken();

      // If logged in
      if (token){
        var payload = authService.parseToken(token);
        console.log(dataService.getCart(payload));
        if (localStorage.getItem('localCart')){
          for (var item in dataService.retrieveLocal('localCart')){
            if (item.lineItemID){
              console.log('pass')
            }
          localStorage.removeItem('localCart');
          }
        }
        //pushToCartDB(lineItem, token);

      // If not logged in
      } else {
        if (!localStorage) {
          alert('Your browser does not support local storage please login');
        } else {
          pushToCartLocal(lineItem);
        }
      }
    }

    var getUniqueID = function(){
      var templateString = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      return templateString.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      })
    }

    return {
      pushToCartDB : pushToCartDB,
      pushToCartLocal : pushToCartLocal,
      removeFromCartLocal : removeFromCartLocal,
      pushLineItem : pushLineItem,
      getUniqueID : getUniqueID
    };
  }

})();