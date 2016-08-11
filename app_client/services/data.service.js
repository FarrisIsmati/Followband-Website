'use strict';

(function() {

  var app = angular.module("followapp.dataService", []);

  app.service('dataService', dataService);

    function dataService ($http, authService) {
    // Declare the authentication service
    var auth = authService;

    // ------------------ $http SERVICES -------------------

    // Get user profile data from database
    var getProfile = function () {
      return $http.get('/follow/profile', {
        headers: {
          Authorization: 'Bearer '+ auth.getToken()
        }
      });
    };

    // Get products from database
    var getProducts = function () {
      return $http.get('/follow/products');
    };

    var getCart = function(payload){
      return $http.get('/follow/cart', {params:{"payload": payload._id}});
    }

    // Send lineItem
    var postLineItem = function(postData) {
      $http.post('/follow/cart', postData).then(function success(response){
          console.log(response);
      }, function error(response){
          console.log(response);
      })
    }

    // ------------------ LOCAL SERVICES -------------------

    // Stores an object to a holder in the users Local Storage
    var storeToLocal = function(holder, object){
      localStorage.setItem(holder, JSON.stringify(object));
    }

    // Retrieves local object
    var retrieveLocal = function(object){
      var retrievedObject = localStorage.getItem(object);
      // If retrieving from local coordinates and havent yet selected coordinates
      // Return the origin coordinates
      if (object === 'coordinates' && retrievedObject === null){
        return JSON.parse('{"lat\":\"N 38° 26\' 1.3488\'\'\",\"lng\":\"W 78° 53\' 54.7332\'\'\"}')
      }
      return JSON.parse(retrievedObject)
    }






    // --------MOVE TO SHOP SERVICE--------------

    var currentProduct = '';

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
      getCart : getCart,
      postLineItem : postLineItem,
      storeToLocal : storeToLocal,
      retrieveLocal  : retrieveLocal,
      setCurrentProduct : setCurrentProduct,
      returnCurrentProduct : returnCurrentProduct
    };
  }


})();