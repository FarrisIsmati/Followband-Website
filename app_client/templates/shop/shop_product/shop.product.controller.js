'use strict';
(function(){

	var app = angular.module("followapp.ShopProductCtrl", []);

	app.controller('ShopProductCtrl', function($scope, $window, dataService, mapService, authService, cartService){
		// Declare the services
		var dataService = dataService;
		var mapService = mapService;
		var shopService = shopService;
		var authService = authService;
		var cartService = cartService;

		// Set the scope of currentSelectedProduct to equal the saved current product in the data service
		// ---------SWITCH TO SHOP SERVICE------------
		$scope.currentSelectedProduct = dataService.returnCurrentProduct();

		if ($scope.currentSelectedProduct && $scope.currentSelectedProduct.size){
			$scope.sizes = $scope.currentSelectedProduct.size.split(',');
		}

		$scope.currentCoordinates = dataService.retrieveLocal('coordinates');

		$scope.sizeDefault = 'size';

		$scope.changeDropdownSelected = function(item){
			$scope.sizeDefault = item;
		}

		$scope.exportProduct = function(){
			// IF LINEITEM HAS ALL REQURIED FIELDS THEN MOVE ON
			var lineItem = {
				lineItemID : cartService.getUniqueID(),
				productId: $scope.currentSelectedProduct._id,
				productName: $scope.currentSelectedProduct.name,
				size: $scope.sizeDefault,
				latitude: $scope.currentCoordinates.lat,
				longitude: $scope.currentCoordinates.lng
			}

			cartService.pushLineItem(lineItem);
		}
	});
	
}());