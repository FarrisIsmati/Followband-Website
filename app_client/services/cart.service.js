'use strict';

(function () {

var app = angular.module("CartService", []);

  app.service('cartService', cart);

  function cart ($http, $window, authService, dataService) {
    // PUSH LINE ITEM TO CART OR POST LINE ITEM TO CART DB
    // Stores line item in the cart
    var pushLineItem = function(lineItem){
      // Declare token
      var token = authService.getToken();

      // If logged in
      if (token){
        var payload = authService.parseToken(token);
        pushToCartDB(lineItem, payload);
      // If not logged in
      } else {
        if (!localStorage) {
          alert('Your browser does not support local storage please login');
        } else {
          pushToCartLocal(lineItem);
        }
      }
    }

    // POST CART LINE ITEM TO DATA BASE
    // If the user is logged in push cart to DB
    var pushToCartDB = function(lineItem, payload){
      dataService.getCart(payload._id).then(function(value){
        if (containsItem(value.data, lineItem)) {
          dataService.putLineItem([lineItem, payload._id]);
        } else {
          dataService.postLineItem([lineItem, payload._id]);
        }
      })
    }

    // Returns true if the line item id matches one in the cart
    var containsItem = function(tempData, lineItem){
      for (var item in tempData){
        if (tempData[item].lineItemID === lineItem.lineItemID){
          return [true, item];
        }
      }
    }

    // PUSH LINEITEM TO CART
    // If the user is not logged in push cart data to local DB
    var pushToCartLocal = function(lineItem){
      var currentSessionCart = [];

      // If local cart exists
      if (localStorage.getItem('localCart')){
        var tempLocal = dataService.retrieveLocal('localCart');
        var checkTrue = containsItem(tempLocal, lineItem);
        // If the line item is in the car then increase the quantity
        if (checkTrue){
          tempLocal[checkTrue[1]].quantity = tempLocal[checkTrue[1]].quantity + 1;
          dataService.storeToLocal('localCart', tempLocal);
        // If not then push a new line item onto the cart
        } else {
          tempLocal.push(lineItem);
          dataService.storeToLocal('localCart', tempLocal);
        }
        console.log(dataService.retrieveLocal('localCart'));
      // If there isn't a local cart then create it and add a line item
      } else {
        currentSessionCart.push(lineItem);
        dataService.storeToLocal('localCart', currentSessionCart);
        console.log(dataService.retrieveLocal('localCart'));
      }
    }

    // CLEAR LOCAL CART
    var clearLocalCart = function(){
      if (localStorage.getItem('localCart')){
        localStorage.removeItem('localCart');
      };
    }

    var updateCart = function(){
    // Take care of this one :)
    }

    return {
      pushToCartDB : pushToCartDB,
      pushToCartLocal : pushToCartLocal,
      clearLocalCart : clearLocalCart,
      pushLineItem : pushLineItem,
      updateCart : updateCart
    };
  }

})();

