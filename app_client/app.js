"use strict";
(function(){

var app = angular.module("followapp", [
 	"ui.router", "ui.bootstrap", "followapp.TabCtrl",
 	"followapp.MapCtrl", "followapp.MainCtrl", "followapp.ShopCtrl", "followapp.ProfileCtrl", "followapp.authService"]);

app.directive('navigation', navigation);
	function navigation () {
		return {
		  restrict: 'EA',
		  templateUrl: '/templates/tabs/tabs.view.html',
		  controller: 'TabCtrl as TabCtrls'
		};
}

app.directive( 'goClick', function ( $location, $state ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'goClick', function (val) {
      path = val;
    });

    $state.go(path)

  };
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

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
			controller: "MapCtrl",
			activetab: false })
			.state("tab.shop",
			{ url: "/shop",
			templateUrl: "templates/shop/shop.view.html",
			controller: "ShopCtrl"})
			//.state("tab.about", { url: "/about", templateUrl: "templates/about/about.view.html", controller: "AboutCtrl"})
			//.state("tab.cart", { url: "/cart", templateUrl: "templates/cart/cart.view.html"})
			.state("tab.register", { url: "/register", templateUrl: "templates/profile/profile.view.html", controller: "ProfileCtrl"})

	 $locationProvider.html5Mode(true);
});
}());