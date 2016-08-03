'use strict';
(function(){

	var app = angular.module("followapp.ShopCtrl", []);

	app.controller('ShopCtrl', function($scope, dataService){
		var data = dataService;

		$scope.menuButtons = [{header: "BEADED", isActive: true},
							  {header: "LEATHER", isActive: false}
							  ]

		data.getProducts()
	    .success(function(data) {
	      	$scope.products = data;
	    })
	    .error(function (e) {
	        console.log(e);
	    });

		$scope.productMatch = function(product){
			for (var button in $scope.menuButtons) {
				if ($scope.menuButtons[button].header.toLowerCase() === product.style.toLowerCase() && $scope.menuButtons[button].isActive){
					return product;
				}
			}
		}
		
		$scope.buttonActive = function(b) {
			for (var button in $scope.menuButtons){
				if (b.isActive == false && b != $scope.menuButtons[button]){
					b.isActive = true;
					$scope.menuButtons[button].isActive = false;
				}
			}
		}
	
	});
	
}());