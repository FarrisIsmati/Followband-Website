'use strict';

(function () {

var app = angular.module("followapp.mapService", []);

  app.service('mapService', mapService);

  function mapService () {
    
    // Map initializing functions

    var initMap = function(origY, origX) {
      this.map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: {lat: origY, lng: origX},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        streetViewControl: false
      });
    };

    var getLatLng = function(marker) {
      var lat = marker.position.lat();
      var lng = marker.position.lng();
      return [lat, lng];
    };

    var createMarker = function(mainMap, myLatLng){
      this.marker = new google.maps.Marker({
          position: myLatLng,
          map: mainMap,
          draggable: true
        });
    }

    var direction = function(direction, d){
      var path 
      // d[4] returns the non absoltue value of Degrees
      if (direction == 'lat'){
        if (d[4] >= 0){
          path = 'N';
        } 
        if (d[4] < 0){
          path = 'S';
        } 
      }
      if (direction == 'lng'){
        if (d[4] >= 0){
          path = 'E';
        } 
        if (d[4] < 0){
          path = 'W';
        } 
      }
      return path
    }

    var toDMS = function(dd){
      var inputNum = Math.abs(dd);
      var d = Math.abs(parseInt(inputNum));
      var m = Math.abs(parseInt((inputNum-d)*60));
      var s = Math.abs((inputNum - d - (m/60)) * 3600); 
      var sf = s.toFixed(4);
      var dms = d + "° " + m + "' " + sf + "''";
      // Absolute Value of Degrees, Minutes, Seconds fixed to 4 decmial spots
      // Non Absolute Value of Degrees for finding direction bearing
      return [d,m,sf, dms, dd];
    }



    // Local Storage Functions

    var storeToLocal = function(object){
      localStorage.setItem('coordinates', JSON.stringify(object));
    }

    var retrieveLocal = function(object){
      var retrievedObject = localStorage.getItem(object);
      return JSON.parse(retrievedObject)
    }

    var concatonateCoordinates = function(lat, lng){
        return {'lat': lat,'lng': lng}
    }

    return {
          initMap : initMap,
          getLatLng: getLatLng,
          direction: direction,
          createMarker : createMarker,
          toDMS : toDMS,
          storeToLocal: storeToLocal,
          retrieveLocal: retrieveLocal,
          concatonateCoordinates: concatonateCoordinates
    };
  }

})();