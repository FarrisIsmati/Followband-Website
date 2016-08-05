'use strict';
(function(){

	var app = angular.module("followapp.ShopProductCtrl", []);

	app.controller('ShopProductCtrl', function($scope, dataService, mapService){
		// Declare the data service
		var data = dataService;
		var mapService = mapService;

		// Set the scope of currentSelectedProduct to equal the saved current product in the data service
		$scope.currentSelectedProduct = data.returnCurrentProduct();

		$scope.currentCoordinates = mapService.retrieveLocal('coordinates');
		console.log(mapService.retrieveLocal('decimalDegrees'));
	});
	
}());