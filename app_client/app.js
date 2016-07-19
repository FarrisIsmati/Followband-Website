"use strict";
(function(){

	var app = angular.module("followapp", [
	 	"ui.router", "ui.bootstrap", "followapp.TabCtrl",
	 	"followapp.MapCtrl", "followapp.MainCtrl", "followapp.ShopCtrl", "followapp.ProfileCtrl", "followapp.UserProfCtrl", "followapp.authService", "followapp.dataService", "followapp.mapService" ]);

	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){

		$urlRouterProvider.otherwise("/tab/main");

		$stateProvider
				.state("tab", { abtract: true, url:"/tab", templateUrl:"templates/tabs/tabs.view.html" })
				.state("tab.main",
				{ url: "/main", 
				templateUrl: "templates/main/main.view.html", 
				controller: "MainCtrl",
				activetab: true
				 })
				.state("tab.map",
				{ url: "/map",
				templateUrl: "templates/map/map.view.html", 
				controller: "MapCtrl"})
				.state("tab.shop",
				{ url: "/shop",
				templateUrl: "templates/shop/shop.view.html",
				controller: "ShopCtrl"})
				.state("tab.userprof",
				{ url: "/userprof",
				templateUrl: "templates/userprof/userprof.view.html",
				controller: "UserProfCtrl"})
				//.state("tab.about", { url: "/about", templateUrl: "templates/about/about.view.html", controller: "AboutCtrl"})
				//.state("tab.cart", { url: "/cart", templateUrl: "templates/cart/cart.view.html"})
				.state("tab.register", { url: "/register", templateUrl: "templates/profile/profile.view.html", controller: "ProfileCtrl"})

	 	$locationProvider.html5Mode(true);
	}]);

	function run($window, $rootScope, $location, $state, authService) {
	var auth = authService;
    $rootScope.$on('$stateChangeStart', function(angularEvent, next, current) {
    	//console.log(next.url);
      if (next.url === '/userprof' && !auth.isLoggedIn()) {
      	//console.log('user not authorized')
      	angularEvent.preventDefault()
        //$window.location.assign('/tab/main');
      }
    });
  };

  app.run(['$window', '$rootScope', '$location', '$state', 'authService', run]);
}());

