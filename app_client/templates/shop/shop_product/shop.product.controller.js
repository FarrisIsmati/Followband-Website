'use strict';
(function(){

	var app = angular.module("followapp.ShopProductCtrl", []);

	app.controller('ShopProductCtrl', function($scope, $window, $timeout, dataService, mapService, authService, cartService){
		// Set the scope of currentSelectedProduct to equal the saved current product in the data service
		$scope.currentSelectedProduct = dataService.returnCurrentProduct();
		console.log($scope.currentSelectedProduct.price);
		// Set the scope of current coordinates to be the coordinates
		$scope.currentCoordinates = dataService.retrieveLocal('coordinates');

		// Set the size of the size dropdown menu
		if ($scope.currentSelectedProduct && $scope.currentSelectedProduct.size){
			$scope.sizes = $scope.currentSelectedProduct.size.split(',');
		}

		$scope.sizeDefault = 'small';

		$scope.changeDropdownSelected = function(item){
			$scope.sizeDefault = item;
		}

		// Export all the aggragte product data to a lineItem
		$scope.exportProduct = function(){
			// IF LINEITEM HAS ALL REQURIED FIELDS THEN MOVE ON
			var lineItem = {
				lineItemID : cartService.getUniqueID(),
				productImg: $scope.currentSelectedProduct.imgLink,
				productId: $scope.currentSelectedProduct._id,
				productName: $scope.currentSelectedProduct.name,
				price: $scope.currentSelectedProduct.price,
				size: $scope.sizeDefault,
				quantity: 1,
				latitude: $scope.currentCoordinates.lat,
				longitude: $scope.currentCoordinates.lng
			}

			cartService.pushLineItem(lineItem);
		}
	});
	
}());