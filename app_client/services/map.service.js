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

    var changeLatLng = function() {
      this.lat = marker.getPosition().lat();
      this.lng = marker.getPosition().lng();
      console.log(this.lat);
      return [this.lat, this.lng];
    };

    var createMarker = function(mainMap, myLatLng){
      this.marker = new google.maps.Marker({
          position: myLatLng,
          map: mainMap,
          draggable: true
        });

      google.maps.event.addListener(this.marker, 'click', function(evt){
        alert('map clicked');
        changeLatLng();
      }.bind(this));
    }

    var toDMS = function(dd){
      var d = parseInt(dd);
      var m = Math.abs(parseInt((dd-d)*60));
      var s = Math.abs((dd - d - m/60) * 3600); 
      var sf = s.toFixed(4);
      return [d,m,sf];
    }

    return {
          initMap : initMap,
          changeLatLng: changeLatLng,
          createMarker : createMarker,
          toDMS : toDMS
    };
  }

})();