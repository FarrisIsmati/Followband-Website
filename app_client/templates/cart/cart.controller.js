'use strict';

(function(){

var app = angular.module("followapp.CartCtrl", []);

app.controller('CartCtrl', function($scope, $http, $window, $location, $rootScope, cartService, dataService, authService){

	var token = authService.getToken();
	
	// If a local cart exists while you are logged in prompt the user to merge the carts
	$scope.checkIfLocalCart = function(){
		if (token && dataService.retrieveLocal('localCart')) {
			console.log('you have local storage cart :)')
			return true;
		} else {
			return false;
		}
	}

    // Resolve getCart promise
    if ( token ) {
    	var payload = authService.parseToken(token);
	   	dataService.getCart(payload).then(function (resolve){
	   	  if (resolve.data){
	   	  	$scope.lineItems = resolve.data; 
	   	  }
	    }, function(reason){
	      console.log(reason);
	    });
    } else {
    	console.log('run the else statement');
    	if (dataService.retrieveLocal('localCart')){
    		$scope.lineItems = dataService.retrieveLocal('localCart');
    	} else {
    		alert('no cart');
    	}
    	
    }

    $scope.itemLineTotal = 1;

    $scope.updateLineItemQty = function(id){
    	console.log('im nuts');
    	if (dataService.retrieveLocal('localCart')){
    		for (var item in dataService.retrieveLocal('localCart')){
    			if (dataService.retrieveLocal('localCart')[item].lineItemID === id){
    				console.log('Update Qty from localstorage')
    			} else {
    				console.log('No matching ID found');
    			}
    		}
    	} else {
    		console.log('Update Qty from database');
    	}
    };

    $scope.calcLineItemTotal = function(item, qty){
    	return item * qty;
    }

	// Merge the local cart to the users DB Cart
	$scope.mergeCart = function(){
		cartService.mergeLocalToDb()
	}

  });

}());