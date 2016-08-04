'use strict';
(function(){

	var app = angular.module("followapp.ShopCtrl", []);

	app.controller('ShopCtrl', function($scope, dataService){
		// Declare the data service
		var data = dataService;

		$scope.menuButtons = data.returnSetMenuState();

		// If there are products set the scope of products
		data.getProducts()
	    .success(function(data) {
	      	$scope.products = data;
	    })
	    .error(function (e) {
	        console.log(e);
	    });

	    // If the product type matches the active state of the navbar return that product
		$scope.productMatch = function(product){
			for (var button in data.returnSetMenuState()) {
				if (data.returnSetMenuState()[button].header.toLowerCase() === product.style.toLowerCase() && data.returnSetMenuState()[button].isActive){
					return product;
				}
			}
		}
		
		// Set the active state of the navbar
		$scope.buttonActive = function(b) {
			for (var button in data.returnSetMenuState() ){
				if (b.isActive == false && b != data.returnSetMenuState()[button]){
					b.isActive = true;
					data.returnSetMenuState()[button].isActive = false;
				}
			}
		}

		// Set the reference for current selected product
		$scope.setProduct = function(product) {
			data.setCurrentProduct(product);
		}

		
	});
	
}());