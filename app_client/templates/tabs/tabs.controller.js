"use strict";
(function(){

var app = angular.module("followapp.TabCtrl", ["ngAnimate"]);

app.controller("TabCtrl", function($rootScope, $scope, $state) {
		console.log('i am workin TabCtrl');		
		
		$scope.cart = 'images/cart.png'

		$scope.shop = function(){
			console.log('we shopping?')
		}

		$scope.go = function(route){
			console.log('goooo')
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "main", route:"main", active:false },
			{ heading: "map", route:"map", active:false },
			{ heading: "shop", route:"shop", active:false },
			{ heading: "about", route:"about", active:false },
			{ heading: "social", route:"social", active:false },
			{ heading: "stories", route:"story", active:false }
		];

		$scope.seperateTabs = { heading: "cart", route:"cart", active:false }
		$scope.seperateTabs2 = { heading: "profile", routeLogin:"profile", active:false}

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
			});
		});
	});
}());