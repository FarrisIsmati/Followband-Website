"use strict";
(function(){

var app = angular.module("followapp", [
 	"ui.router", "ui.bootstrap", "followapp.TabCtrl",
 	"followapp.MapCtrl", "followapp.MainCtrl"]);

app.directive('navigation', navigation);

function navigation () {
return {
  restrict: 'EA',
  templateUrl: '/templates/tabs/tabs.view.html',
  controller: 'TabCtrl as TabCtrls'
};
}

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/main");

	$stateProvider
			.state("main", { url: "/main", templateUrl: "templates/main/main.view.html", controller: "MainCtrl" })
			.state("map", { url: "/map", templateUrl: "templates/map/map.view.html", controller: "MapCtrl" })
			//.state("tab.shop", { url: "/shop", templateUrl: "templates/shop/shop.view.html", controller: "ShopCtrl"})
			//.state("tab.about", { url: "/about", templateUrl: "templates/about/about.view.html", controller: "AboutCtrl"})
			//.state("tab.cart", { url: "/cart", templateUrl: "templates/cart/cart.view.html"})
			//.state("tab.profile", { url: "/profile", templateUrl: "templates/profile/profile.view.html", controller: "ProfileCtrl"})

});
}());