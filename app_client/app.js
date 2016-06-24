"use strict";
(function(){

var app = angular.module("FollowApp", [
 	"ui.router", "ui.bootstrap"]);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/tab/main");

	$stateProvider
		.state("tab", { abtract: true, url:"/tab", templateUrl:"templates/tab/tab.view.html" })
			.state("tab.main", { url: "/main", templateUrl: "templates/main/main.view.html", controller: "MainCtrl" })
			.state("tab.map", { url: "/map", templateUrl: "templates/map/map.view.html", controller: "MapCtrl" })
			.state("tab.shop", { url: "/shop", templateUrl: "templates/shop/shop.view.html", controller: "ShopCtrl"})
			//.state("tab.about", { url: "/about", templateUrl: "templates/about/about.view.html", controller: "AboutCtrl"})
			//.state("tab.cart", { url: "/cart", templateUrl: "templates/cart/cart.view.html"})
			.state("tab.profile", { url: "/profile", templateUrl: "templates/profile/profile.view.html", controller: "ProfileCtrl"})

});
}());