'use strict';

(function() {

var app = angular.module("followapp.MapCtrl", []);

app.controller('MapCtrl', function($scope){

	console.log('I am workin mapctrl')

	var origY = 38.433708;
	var origX = -78.898537;

	var toDMS = function(dd){
		var d = parseInt(dd);
		var m = Math.abs(parseInt((dd-d)*60));
		var s = Math.abs((dd - d - m/60) * 3600); 
		var sf = s.toFixed(4);
		return [d,m,sf];
	}

	$scope.map;
	var latlng = new google.maps.LatLng(origY, origX);
	var myOptions = {
	    zoom: 4,
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

	var myLatLng = new google.maps.LatLng(origY, origX);

	var marker = new google.maps.Marker({
	    position: myLatLng,
	    map: $scope.map,
	    draggable: true,
	    title: 'Hello World!'
  	});

  	var lat, lng

	var changeLatLng = function() {
		lat = marker.getPosition().lat();
		lng = marker.getPosition().lng();
		console.log(lat);
		return [lat, lng];
	}

	google.maps.event.addListener(marker, 'dragend', function(evt){
			changeLatLng()
	})

	$scope.latdms = changeLatLng()[0];
	$scope.lngdms = toDMS(lng);



	marker.setMap(map);

})
}());