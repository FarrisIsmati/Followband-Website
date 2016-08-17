'use strict';

(function(){

var app = angular.module("followapp.CartCtrl", []);

app.controller('CartCtrl', function($scope, $http, $window, $location, $rootScope, cartService, dataService, authService){

	var token = authService.getToken();
	
    // Resolve getCart promise
    if ( token ) {
    	var payload = authService.parseToken(token);
	   	dataService.getCart(payload._id).then(function (resolve){
	   	  if (resolve.data){
	   	  	$scope.lineItems = resolve.data; 

            $scope.deleteLineItem = function(lineitem){
                dataService.deleteLineItem([lineitem.lineItemID, payload._id]);
            }
	   	  }
	    }, function(reason){
	      console.log(reason);
	    });
    } else {
    	if (dataService.retrieveLocal('localCart')){
    		$scope.lineItems = dataService.retrieveLocal('localCart');

            $scope.deleteLineItem = function(lineitem){
                var cart = dataService.retrieveLocal('localCart');
                var updatedCart = cart.filter(function(item){
                    if (lineitem.lineItemID != item.lineItemID){
                        return item
                    }
                })
                dataService.storeToLocal('localCart', updatedCart);
            }
    	}	
    }
 
    // If a local cart exists while you are logged in prompt the user to merge the carts
    $scope.checkIfLocalCart = function(){
        if (token && dataService.retrieveLocal('localCart')) {
            console.log('you have local storage cart :)')
            return true;
        } else {
            return false;
        }
    }

    //This needs to be placed in the update function ^^ So it gets qty from the database
    $scope.calcLineItemTotal = function(item, qty){
    	return item * qty;
    }

    $scope.clearLocalCart = function(){
        cartService.clearLocalCart();
    }

  });

}());