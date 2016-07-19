'use strict';

(function() {

var app = angular.module("followapp.MapCtrl", []);

app.controller('MapCtrl', function($scope, mapService){
	var mapService = mapService;

	var origY = 38.433708;
	var origX = -78.898537;

	var map = new mapService.initMap(origY, origX);

	var myLatLng = new google.maps.LatLng(origY, origX);

	var mapMarker = new mapService.createMarker(map.map, myLatLng);
	
	var lat = mapService.toDMS(mapService.getLatLng(mapMarker.marker)[0]);
    var lng = mapService.toDMS(mapService.getLatLng(mapMarker.marker)[1]);
	var latDir = mapService.direction('lat', mapService.toDMS(mapService.getLatLng(mapMarker.marker)[0]));
	var lngDir = mapService.direction('lng', mapService.toDMS(mapService.getLatLng(mapMarker.marker)[1]));

	$scope.latitudeDirection = latDir;
	$scope.latitudeDMS = lat[3];
	$scope.longitudeDMS = lng[3];
	$scope.longitudeDirection = lngDir;

    google.maps.event.addListener(mapMarker.marker, 'dragend', function(evt){
    	$scope.$apply(function(){
		    var lat = mapService.toDMS(mapService.getLatLng(mapMarker.marker)[0]);
		    var lng = mapService.toDMS(mapService.getLatLng(mapMarker.marker)[1]);
			var latDir = mapService.direction('lat', mapService.toDMS(mapService.getLatLng(mapMarker.marker)[0]));
			var lngDir = mapService.direction('lng', mapService.toDMS(mapService.getLatLng(mapMarker.marker)[1]));

			$scope.latitudeDMS = lat[3];
			$scope.latitudeDirection = latDir;

			$scope.longitudeDMS = lng[3];
			$scope.longitudeDirection = lngDir;
		});
  	});



})
}());