'use strict';

(function(){

var app = angular.module("CartCtrl", []);

app.controller('CartCtrl', function($scope, $http, $window, $location, $rootScope, $state, cartService, dataService, authService){

    $scope.cartview = ['/templates/cart/cart.view.mobile.html', '/templates/cart/cart.view.html']

	var token = authService.getToken();

    // Resolve getCart promise
    if ( token ) {
    	var payload = authService.parseToken(token);
	   	dataService.getCart(payload._id).then(function (value){
            if (value.data){

    	   	  	$scope.lineItems = value.data;

                $scope.deleteLineItem = function(lineitem){
                    dataService.deleteLineItem([lineitem.lineItemID, payload._id]);
                }

                $scope.updateLineItemQty = function(lineItem){
                    if (cartService.containsItem(value.data, lineItem)) {
                      dataService.putLineItem([lineItem, payload._id, lineItem.quantity]);
                    }
                }

                $scope.total = function(){
                    return cartService.cartTotal(value.data);
                }

    	   	}
	    }, function(reason){
	      console.log(reason);
	    });
    } else {
        var localCart = dataService.retrieveLocal('localCart');

    	if (localCart){
    		$scope.lineItems = localCart;

            $scope.deleteLineItem = function(lineItem){
                cartService.deleteLocalLineItem(localCart, lineItem);
            }

            $scope.updateLineItemQty = function(lineItem){
                cartService.updateLocalLineItem(localCart, lineItem);
            }

            $scope.clearLocalCart = function(){
                cartService.clearLocalCart();
            }

            $scope.total = function(){
                return cartService.cartTotal(localCart);
            }

    	}	
    }

    //This needs to be placed in the update function ^^ So it gets qty from the database
    $scope.calcLineItemTotal = function(item, qty){
        return item * qty;
    }

    $scope.reloadRoute = function(){
        $state.reload();
    }

  });

}());