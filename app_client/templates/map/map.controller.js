'use strict';

(function() {

var app = angular.module("followapp.MapCtrl", []);

app.controller('MapCtrl', function($scope, mapService){
	var mapService = mapService;

  // If there is saved coordinates in local storage use it
  // If not use the default position
  var decimalDegrees = mapService.retrieveLocal('decimalDegrees');
  console.log(decimalDegrees);
  if (decimalDegrees != null){
    var origY = decimalDegrees[0];
    var origX = decimalDegrees[1];
  } else {
    var origY = 38.433708;
    var origX = -78.898537;
  }

	var map = new mapService.initMap(origY, origX);

	var myLatLng = new google.maps.LatLng(origY, origX);

	var mapMarker = new mapService.createMarker(map.map, myLatLng);

	var returnDirection = {
		lat : function(){
			return mapService.toDMS(mapService.getLatLng(mapMarker.marker)[0]);
		},
		lng : function(){
			return mapService.toDMS(mapService.getLatLng(mapMarker.marker)[1]);
		},
		latDir : function(){
			return mapService.direction('lat', mapService.toDMS(mapService.getLatLng(mapMarker.marker)[0]));
		},
		lngDir : function(){
			return mapService.direction('lng', mapService.toDMS(mapService.getLatLng(mapMarker.marker)[1]));
		},
	}

  var saveDecimalDegreesToStorage = function(){
    var latLngDecimalDegrees = [returnDirection.lat()[4], returnDirection.lng()[4]]

    localStorage.setItem('decimalDegrees', JSON.stringify(latLngDecimalDegrees));
  }

	$scope.latitudeDirection = returnDirection.latDir();
	$scope.latitudeDMS = returnDirection.lat()[3];
	
	$scope.longitudeDirection = returnDirection.lngDir();
	$scope.longitudeDMS = returnDirection.lng()[3];

  var callCoords = function(){
    $scope.$apply(function(){
      $scope.latitudeDMS = returnDirection.lat()[3];
      $scope.latitudeDirection = returnDirection.latDir();

      $scope.longitudeDMS = returnDirection.lng()[3];
      $scope.longitudeDirection = returnDirection.lngDir();

      mapService.storeToLocal(mapService.concatonateCoordinates(returnDirection.latDir() + ' ' + returnDirection.lat()[3], returnDirection.lngDir() + ' ' + returnDirection.lng()[3]));
    });
    
    saveDecimalDegreesToStorage();
  }

  google.maps.event.addListener(mapMarker.marker, 'dragend', function(evt){
    callCoords();
	});


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // Bias the SearchBox results towards current map's viewport.
  map.map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.map.getBounds());
  });

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

    mapMarker.marker.setPosition(place.geometry.location);

    callCoords();
    var latLngDecimalDegrees = [returnDirection.lat()[4], returnDirection.lng()[4]]

    localStorage.setItem('decimalDegrees', JSON.stringify(latLngDecimalDegrees));

    if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
    } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.map.fitBounds(bounds);

  });

  // Map Display Tip
  $scope.className = "map-display-tip-deactive";

  $scope.changeClass = function(){
    if ($scope.className === "map-display-tip-deactive"){
      $scope.className = "map-display-tip";
    }
    else{
      $scope.className = "map-display-tip-deactive";
    }
  };

})
}());