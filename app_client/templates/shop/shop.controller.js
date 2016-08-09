'use strict';
(function(){

	var app = angular.module("followapp.ShopCtrl", []);

	app.controller('ShopCtrl', function($scope, dataService, shopService){
		// Declare the services
		var dataService = dataService;
		var shopService = shopService;

		$scope.menuButtons = shopService.returnSetMenuState();

		// If there are products set the scope of products
		dataService.getProducts()
	    .success(function(data) {
	      	$scope.products = data;
	    })
	    .error(function (e) {
	        console.log(e);
	    });

	    // If the product type matches the active state of the navbar return that product
		$scope.productMatch = function(product){
			for (var button in shopService.returnSetMenuState()) {
				if (shopService.returnSetMenuState()[button].header.toLowerCase() === product.style.toLowerCase() && shopService.returnSetMenuState()[button].isActive){
					return product;
				}
			}
		}
		
		// Set the active state of the navbar
		$scope.buttonActive = function(b) {
			for (var button in shopService.returnSetMenuState() ){
				if (b.isActive == false && b != shopService.returnSetMenuState()[button]){
					b.isActive = true;
					shopService.returnSetMenuState()[button].isActive = false;
				}
			}
		}

		// Set the reference for current selected product
		// ---------SWITCH TO SHOP SERVICE------------
		$scope.setProduct = function(product) {
			dataService.setCurrentProduct(product);
		}

		
	});
	
}());