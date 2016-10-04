'use strict';
(function(){

var app = angular.module("ShopCtrl", []);

app.controller('ShopCtrl', ['$scope', '$state', '$rootScope', '$stateParams','dataService', 'shopService', function($scope, $state, $rootScope, $stateParams, dataService, shopService){
	// Set scope for mobile and web versions of page
	$scope.shopview = ['/templates/shop/shop.view.mobile.html', '/templates/shop/shop.view.html']

	// If there are products set the scope of products
	dataService.getProducts().success(function(data) {
      	$scope.products = data;
    }).error(function (e) {
    	alert('Cannot connect to the database')
        console.log(e);
    });

	// If the individual product is selected the product menu will dissapear
	$scope.getState = function(){
		if ($rootScope.$state.current.name === 'shop.product'){
			return true;
		} else {
			return false;
		}
	}

	// Retreives the currently active bracelets button
	$scope.menuButtons = shopService.returnSetMenuState();

	// Set the active state of the navbar
	$scope.buttonActive = function(b) {
		for (var button in shopService.returnSetMenuState() ){
			if (b.isActive == false && b != shopService.returnSetMenuState()[button]){
				shopService.setCurrentProduct(b);
				b.isActive = true;
				shopService.returnSetMenuState()[button].isActive = false;
			}
		}
	}

    // If the product type matches the active state of the navbar return that product
	$scope.productMatch = function(product){
		for (var button in shopService.returnSetMenuState()) {
			if (shopService.returnSetMenuState()[button].header.toLowerCase() === product.style.toLowerCase() && shopService.returnSetMenuState()[button].isActive){
				return product;
			}
		}
	}
	
	// Set the reference for current selected product
	$scope.setProduct = function(product) {
		dataService.storeToLocal('currentProduct', product);
	
		// Need to fix the URL Parmeters here so they actually work
		$state.go('shop.product', { obj: JSON.stringify(product.name) } )
	}

}]);
	

}());