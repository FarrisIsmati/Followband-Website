'use strict';

(function(){

var app = angular.module("CartCtrl", []);

app.controller('CartCtrl', function($scope, $http, $window, $location, $rootScope, cartService, dataService, authService){
    
    $window.onresize = function() {
        $scope.changeTemplate();
        $scope.$apply();
    };

    $scope.changeTemplate = function() {
        var screenWidth = $window.innerWidth;
        if (screenWidth < 1000) {
            return 'templates/tab/tab.view.mobile.html';
        } else if (screenWidth >= 1000) {
            return 'templates/tab/tab.view.html';
        }
    }

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
                console.log('Run this bitch');
                if (cartService.containsItem(value.data, lineItem)) {
                  dataService.putLineItem([lineItem, payload._id, lineItem.quantity]);
                }
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

            $scope.updateLineItemQty = function(lineItem){
                var tempLocal = dataService.retrieveLocal('localCart');
                var checkTrue = cartService.containsItem(tempLocal, lineItem);
                // If the line item is in the cart then increase the quantity
                if (checkTrue){
                  tempLocal[checkTrue[1]].quantity = lineItem.quantity;
                  dataService.storeToLocal('localCart', tempLocal);
                }
                console.log(lineItem);
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