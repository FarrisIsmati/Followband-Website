"use strict";
(function(){

	var app = angular.module("followapp", [
	 	"ui.router", "ui.bootstrap", "followapp.RouteCtrl",
	 	"followapp.MapCtrl", "followapp.MainCtrl", "followapp.ShopCtrl", "followapp.ProfileCtrl", "followapp.UserProfCtrl", "followapp.ShopProductCtrl", "followapp.CartCtrl", "followapp.authService", "followapp.dataService", "followapp.mapService" ]);

	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
		console.log($urlRouterProvider);
		$urlRouterProvider.otherwise("/follow/main");

		$stateProvider
				.state("follow", { abstract: true, url:"/follow", templateUrl:"templates/tabs/tabs.view.html" })

					.state("follow.main",
					{ url: "/main", 
					templateUrl: "templates/main/main.view.html", 
					controller: "MainCtrl",
					activetab: true
					 })

					.state("follow.map",
					{ url: "/map",
					templateUrl: "templates/map/map.view.html", 
					controller: "MapCtrl"})

					.state("follow.shop",
					{url: "/shop",
					templateUrl: "templates/shop/shop.view.html",
					controller: "ShopCtrl"})
						.state("follow.product",
							{ url: "/product",
							  templateUrl: "templates/shop/shop_product/shop.product.view.html",
							controller: "ShopProductCtrl"})

					.state("follow.cart",
					{ url: "/cart",
					templateUrl: "templates/cart/cart.view.html",
					controller: "CartCtrl"})

					.state("follow.userprof",
					{ url: "/userprof",
					templateUrl: "templates/userprof/userprof.view.html",
					controller: "UserProfCtrl"})

					.state("follow.register", { url: "/register", templateUrl: "templates/profile/profile.view.html", controller: "ProfileCtrl"})

	 	$locationProvider.html5Mode(true);
	}]);

	function run($window, $rootScope, $location, $state, authService) {
	var auth = authService;
    $rootScope.$on('$stateChangeStart', function(angularEvent, next, current) {
      if (next.url === '/userprof' && !auth.isLoggedIn()) {
      	angularEvent.preventDefault()
      }
    });
  };

  app.run(['$window', '$rootScope', '$location', '$state', 'authService', run]);
}());

