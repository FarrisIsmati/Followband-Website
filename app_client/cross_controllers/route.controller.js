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
			{ heading: "main", route:"follow.main", active:false },
			{ heading: "shop", route:"follow.shop", active:false }
		];

		$scope.states = {
			shopProduct : { heading: "shopProduct", route: "follow.product", active:false },
			mapPage : { heading: "map", route:"follow.map", active:false },
			cartPage : { heading: "cart", route:"follow.cart", active:false },
			profilePage : { heading: "userprof", route:"follow.userprof", active:false		},
			registerPage : { heading: "register", routeLogin:"follow.register", active:false}
		}
		
		$scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
				// For all keys in states if toState.name === key.route then key.route.active = true

				for (var key in $scope.states){
					if (toState.name === $scope.states[key].route){
						$scope.states[key].active = true;
					} else {
						$scope.states[key].active = false;
					}
				}

				$scope.tabs.forEach(function(tab) {
					tab.active = $scope.active(tab.route);
				});

			

		});


	});
}());