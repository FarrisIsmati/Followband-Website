"use strict";
(function(){

var app = angular.module("followapp.TabCtrl", []);

app.controller("TabCtrl", function($rootScope, $scope, $state, authService) {

		$scope.cart = 'images/cart.png'

		$scope.go = function(route){
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

		
		$scope.seperateTabs3 = { heading: "userprof", route:"tab.userprof", active:false};
		$scope.seperateTabs = { heading: "cart", route:"tab.cart", active:false };
		$scope.seperateTabs2 = { heading: "register", routeLogin:"tab.register", active:false}

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				//console.log(tab);
				tab.active = $scope.active(tab.route);
			});
		});

		// var auth = authService;
		//     $rootScope.$on('$stateChangeStart', function(angularEvent, next, current) {
		//     	console.log(current)
		//     if (next.url === '/userprof') {
		//         $state.go('tab.main');
		//     }
		// });
	});
}());