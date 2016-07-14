'use strict';

(function() {

var app = angular.module("followapp.MapCtrl", []);

app.controller('MapCtrl', function($scope, mapService){
	var mapService = mapService;

	var origY = 38.433708;
	var origX = -78.898537;

	var map = new mapService.initMap(origY, origX);

	var myLatLng = new google.maps.LatLng(origY, origX);

	mapService.createMarker(map.map, myLatLng);

	// //Initialize map

 //  	var lat, lng

	// var changeLatLng = function() {
	// 	lat = marker.getPosition().lat();
	// 	lng = marker.getPosition().lng();
	// 	console.log(lat);
	// 	return [lat, lng];
	// }

	

	// $scope.latdms = changeLatLng()[0];
	// $scope.lngdms = toDMS(lng);



	// 

})
}());