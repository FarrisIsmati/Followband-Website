'use strict';
(function(){

var app = angular.module("followapp.MainCtrl", []);

app.controller('MainCtrl', function($scope){
  $scope.myInterval = 20000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function(i) {
    var newWidth = screen.width + slides.length + 1;
    slides.push({
      image: '../../images/image' + i + '.jpg',
      id: currIndex++
    });
  };

  for (var i = 1; i < 4; i++) {
    $scope.addSlide(i);
  }

  $scope.imagesRow1 = [{'id':'../../images/row11.jpg', 'desc':'follow stories'}, {'id':'../../images/row12.jpg', 'desc':'follow products'}, {'id':'../../images/row13.jpg', 'desc':'follow media'}]
})

}());