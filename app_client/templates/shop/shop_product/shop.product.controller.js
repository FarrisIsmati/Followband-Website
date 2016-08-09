'use strict';
(function(){

	var app = angular.module("followapp.ShopProductCtrl", []);

	app.controller('ShopProductCtrl', function($scope, dataService, mapService, authService){
		// Declare the services
		var dataService = dataService;
		var mapService = mapService;
		var shopService = shopService;
		var authService = authService;

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
			// if (lineItem != undefined)
			var lineItem = {
				_id: $scope.currentSelectedProduct._id,
				size: $scope.sizeDefault,
				latitude: $scope.currentCoordinates.lat,
				longitude: $scope.currentCoordinates.lng
			}

			if (authService.isLoggedIn()){
				// Send product to user cart
				
				//dataService.postLineItem();
			} //else {
				// If not logged in send product to local storage cart
			//}

			
			// If logged in and detected new items in local storage append them to the user cart
		}
	});
	
}());