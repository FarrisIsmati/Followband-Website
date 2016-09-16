'use strict';
(function(){

	var app = angular.module("TabCtrl", []);

	//Removed stateParams fyi
	app.controller('TabCtrl', function($scope){
		// Set scope for mobile and web versions of page
		$scope.tabview = ['/templates/tab/tab.view.mobile.html', '/templates/tab/tab.view.html']
	});
	

}());