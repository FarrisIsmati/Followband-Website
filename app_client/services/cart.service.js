'use strict';

(function () {

var app = angular.module("followapp.cartService", []);

  app.service('cartService', cart);

  function cart ($http, $window, authService, dataService) {
    // If the user is logged in push cart to DB
    var pushToCartDB = function(lineItem, token){
      var payload = authService.parseToken(token);
      dataService.postLineItem([lineItem, payload._id]);
    }

    var currentSessionCart = []; 
    var currentSessionCartPopulated = []; 

    // If the user is not logged in push cart data to local DB (Try encapsulating this with an object ^The shit up there)
    var pushToCartLocal = function(lineItem){
      if (localStorage.getItem('localCart')){
        var localLength = localStorage.getItem('localCart').length - 1;
        currentSessionCartPopulated.push(lineItem);
        var objectToString = JSON.stringify(currentSessionCartPopulated).substring(1).slice(0, -1);
        var output = [localStorage.getItem('localCart').slice(0, localLength) + ',', objectToString, localStorage.getItem('localCart').slice(localLength)].join('');

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

    // If user is logged in then merge Local Cart to DB Cart
    var mergeLocalToDb = function(){
      var token = authService.getToken();
          if (token){
            var payload = authService.parseToken(token);

            // Merge local Storage with user cart if local storage detected
            if (localStorage.getItem('localCart')){
              for (var item in dataService.retrieveLocal('localCart')){
                pushToCartDB(dataService.retrieveLocal('localCart')[item], token);
            }
            removeFromCartLocal();
          }
      }
    }

    // Stores line item in the cart
    var pushLineItem = function(lineItem){
      // Declare token
      var token = authService.getToken();

      // If logged in
      if (token){
        var payload = authService.parseToken(token);
        pushToCartDB(lineItem, token);
      // If not logged in
      } else {
        if (!localStorage) {
          alert('Your browser does not support local storage please login');
        } else {
          pushToCartLocal(lineItem);
        }
      }
    }

    // Create a unique ID for lineItems (Not mission critical);
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
      mergeLocalToDb : mergeLocalToDb,
      removeFromCartLocal : removeFromCartLocal,
      pushLineItem : pushLineItem,
      getUniqueID : getUniqueID
    };
  }

})();

        // Resolve getCart promise
        // dataService.getCart(payload).then(function (resolve){
        //   console.log(resolve.data[0].lineItemID);
        // }, function(reason){
        //   console.log(reason);
        // });