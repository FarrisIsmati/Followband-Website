'use strict';
(function(){

	var app = angular.module("followapp.ShopCtrl", ["ngAnimate"]);

	app.controller('ShopCtrl', function($scope){


		$scope.menuButtons = [{header: "BEADED", isActive: true},
							  {header: "LEATHER", isActive: false}
							  ]

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