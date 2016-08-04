"use strict";
(function(){

var app = angular.module("followapp.RouteCtrl", []);

app.controller("RouteCtrl", function($rootScope, $scope, $state, authService) {

		$scope.go = function(route){
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "main", route:"tab.main", active:false },
			{ heading: "shop", route:"tab.shop", active:false }
		];

		$scope.states = {
			shopProduct : { heading: "shopProduct", route: "tab.product", active:false },
			mapPage : { heading: "map", route:"tab.map", active:false },
			cartPage : { heading: "cart", route:"tab.cart", active:false },
			profilePage : { heading: "userprof", route:"tab.userprof", active:false		},
			registerPage : { heading: "register", routeLogin:"tab.register", active:false}
		}
		
		$scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
			// If state entered is product keep shop state still active (Need to do nested states so I don't have to program this in myself)
			if (toState.name === $scope.states.shopProduct.route){
				$scope.active($scope.states.shopProduct.route);
				$scope.active($scope.tabs[1].route);
			} 
			// Else activate state
			else {
				$scope.tabs.forEach(function(tab) {
					tab.active = $scope.active(tab.route);
				});
			}
		});


	});
}());