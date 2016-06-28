"use strict";
(function(){

var app = angular.module("followapp.TabCtrl", ["ngAnimate"]);

app.controller("TabCtrl", function($rootScope, $scope, $state) {

		$scope.cart = 'images/cart.png'

		$scope.go = function(route){
			console.log('goooo')
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "main", route:"tab.main", active:false },
			{ heading: "map", route:"tab.map", active:false },
			{ heading: "shop", route:"tab.shop", active:false }
			//{ heading: "about", route:"tab.about", active:false },
			//{ heading: "social", route:"tab.social", active:false },
			//{ heading: "stories", route:"tab.story", active:false }
		];

		$scope.seperateTabs = { heading: "cart", route:"tab.cart", active:false }
		$scope.seperateTabs2 = { heading: "register", routeLogin:"tab.register", active:false}

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
			});
		});
	});
}());