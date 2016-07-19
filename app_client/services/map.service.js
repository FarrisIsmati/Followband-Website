'use strict';

(function () {

var app = angular.module("followapp.mapService", []);

  app.service('mapService', mapService);

  function mapService () {

    var initMap = function(origY, origX) {
      this.map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: {lat: origY, lng: origX},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN
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
      if (direction == 'lat'){
        console.log(d[0]);
        if (d[0] >= 0){
          path = 'N';
        } 
        if (d[0] < 0){
          path = 'S';
        } 
      }
      if (direction == 'lng'){
        if (d[0] >= 0){
          path = 'E';
        } 
        if (d[0] < 0){
          path = 'W';
        } 
      }
      return path
    }

    var toDMS = function(dd){
      var d = parseInt(dd);
      var m = Math.abs(parseInt((dd-d)*60));
      var s = Math.abs((dd.toFixed(6) - d - (m/60)) * 3600); 
      console.log(dd.toFixed(6) + ' ' + d + ' ' + m)
      var sf = s.toFixed(4);
      var dms = d + "° " + m + "' " + sf + "''";
      return [d,m,sf, dms];
    }

    return {
          initMap : initMap,
          getLatLng: getLatLng,
          direction: direction,
          createMarker : createMarker,
          toDMS : toDMS
    };
  }

})();