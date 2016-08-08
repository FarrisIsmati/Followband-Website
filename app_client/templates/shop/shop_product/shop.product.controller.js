'use strict';
(function(){

	var app = angular.module("followapp.ShopProductCtrl", []);

	app.controller('ShopProductCtrl', function($scope, dataService, mapService){
		// Declare the data service
		var data = dataService;
		var mapService = mapService;

		// Set the scope of currentSelectedProduct to equal the saved current product in the data service
		$scope.currentSelectedProduct = data.returnCurrentProduct();

		if ($scope.currentSelectedProduct && $scope.currentSelectedProduct.size){
			$scope.sizes = $scope.currentSelectedProduct.size.split(',');
		}

		$scope.currentCoordinates = mapService.retrieveLocal('coordinates');

		$scope.sizeDefault = 'size';

		$scope.changeDropdownSelected = function(item){
			$scope.sizeDefault = item;
		}

		var exportProduct = {
			size: this.size,
			coordinates: this.coordinates,
			product: this.product
		}

		$scope.exportProduct = function(exportProduct){
			// All of these are data service functions passing in exportProduct variable

			// If not logged in send product to local storage cart

			// If logged in send product to user cart

			// If logged in and detected new items in local storage append them to the user cart
		}
	});
	
}());