"use strict";
(function(){

  var app = angular.module("followapp", ['ui.bootstrap', 'ui.bootstrap.tpls', 'ui.router', 'MainCtrl', 'ShopCtrl', 'CartCtrl', 'RouteCtrl', 'ShopProductCtrl', 'ProfileCtrl', 'UserProfCtrl', 'MapCtrl', 'RegSuccessCtrl', 'ShopService', 'MapService', 'DataService', 'CartService', 'AuthService', 'StateService']);

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/main");
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('main', {
        url: "/main",
        views: {
          "mainView": {
            templateUrl: '/templates/main/main.view.html',
            controller: 'MainCtrl',
          }
        }
      })
      .state('shop', {
        url: "/shop",
        onEnter: ['$state', function($state) {
        }],
        views: {
          "mainView": {
            templateUrl: '/templates/shop/shop.view.html',
            controller: 'ShopCtrl',
            data: {}
          }
        }
      })
      .state('shop.product', {
        url: '/product/:id',
        params: {
          obj: null,
          id: null
        },
        views: {
          "mainView.product": {
            templateUrl: '/templates/shop/shop_product/shop.product.view.html',
            controller: 'ShopProductCtrl',
            data: {}
          }
        }
      })
      .state('map', {
        url: '/map',
        views: {
          "mainView":{
            templateUrl: '/templates/map/map.view.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('authenticate', {
        url: '/authenticate',
        views: {
          "mainView": {
            templateUrl: '/templates/profile/profile.view.html',
            controller: 'ProfileCtrl'
          }
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          "mainView": {
            templateUrl: '/templates/userprof/userprof.view.html',
            controller: 'UserProfCtrl'
          }
        }
      })
      .state('registerSuccess', {
        url: '/regSuccess',
        views: {
          "mainView": {
            templateUrl: '/templates/authSuccess/register.success.view.html',
            controller: 'RegSuccessCtrl'
          }
        }
      })
      .state('cart', {
        url: '/cart',
        views: {
          "mainView": {
            templateUrl: '/templates/cart/cart.view.html',
            controller: 'CartCtrl'
          }
        }
      })
  }]);

  function run($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  };

  app.run(['$rootScope', '$state', '$stateParams', run]);
}());


