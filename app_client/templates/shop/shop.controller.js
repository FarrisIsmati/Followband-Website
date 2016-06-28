'use strict';
(function(){

	var app = angular.module("followapp.ShopCtrl", ["ngAnimate"]);

	app.controller('ShopCtrl', function($scope){
		console.log('Shop')

		$scope.menuButtons = [{header: "beaded", isActive: false, 
							  subGroup: [
							  			 {name: "obsidian", isActive: true,
							  			  description: "sleek design, mysterious origins, the right choice for journeys to places unknown", price: "24.99"},
							  			 {name: "fire", isActive: false, description: "bold patterns, passionate beginings, for the days you're feeling ambitious", price: "22.99"},
							  			 {name: "ice", isActive: false, description: "cool patterns, refreshing start, the band that will slow down your surroundings", price: "22.99"},
							  			 {name: "jupiter", isActive: false, description: "ascending platform, continous growth, the style for venturing far but to places common", price: "22.99"},
							  			 {name: "beach", isActive: false, description: "colorful nature, natural beginings, a light and playful bracelet to brighten your attire", price: "21.99"},
							  			 {name: "dragon", isActive: false, description: "precise vision, solid anchor, the piece for adventurers that require a design as bold as they are", price: "28.99"},
							  			 {name: "stone", isActive: false, description: "timeless design, classic patterns, the age old time tested design works with every journey", price: "26.99"},
							  			 {name: "pearl", isActive: false, description: "new born, innocent nature, the piece designed with the good natured in mind", price: "22.99"},
							  			 {name: "eclipse", isActive: false, description: "some ass beads", price: "22.99"}]},
							  {header: "laced", isActive: false, 
							  subGroup: [
							  			 {name: "mariner", isActive: false, description: "nautical roots, crafted design, a piece for the yacht owner and the aspiring yacht owner", price: "28.99"},
							  			 {name: "bear", isActive: false, description: "strong foundation, timeless classic, a piece as strong as its inspiration", price: "28.99"},
							  			 {name: "frost", isActive: false, description: "vivid base, simple patterns, inspired by and created in the artic",price: "28.99"},
							  			 {name: "earth", isActive: false, description: "grounded roots, natural balance, a piece that pays homage to the only home we know",price: "28.99"}]}
							  ]


	  	$scope.activeSelect = function(dataSmall) {
	  		for (var p in $scope.menuButtons){
	  			for (var x in $scope.menuButtons[p].subGroup){
	  				if ($scope.menuButtons[p].subGroup[x].name == dataSmall.name) {
	  					dataSmall.isActive = true;
	  				}
	  				if ($scope.menuButtons[p].subGroup[x].isActive && $scope.menuButtons[p].subGroup[x].name != dataSmall.name) {
						$scope.menuButtons[p].subGroup[x].isActive = false;
	  				}
	  			}
	  		}
	  	}

	  	$scope.activeData = function(){
	  		for (var p in $scope.menuButtons){
	  			for (var x in $scope.menuButtons[p].subGroup){
	  				if ($scope.menuButtons[p].subGroup[x].isActive){
	  					return $scope.menuButtons[p].subGroup[x];
	  				}
	  			}
	  		}
	  	}



	  	



	});
	
}());