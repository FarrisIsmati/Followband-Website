'use strict';
(function(){

var app = angular.module("FooterCtrl", []);

app.controller('FooterCtrl', ['$scope', function($scope){

	// Set scope for mobile and web versions of page
	$scope.footerview = ['/templates/footer/footer.view.mobile.html', '/templates/footer/footer.view.html'];
	
}]);

}());