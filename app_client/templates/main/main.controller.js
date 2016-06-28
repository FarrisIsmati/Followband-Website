'use strict';
(function(){

var app = angular.module("followapp.MainCtrl", ["ngAnimate"]);

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

  $scope.underImageHolder = [{'id':'../../images/t1.jpg', 'desc':'refined elegance'},{'id':'../../images/t2.jpg', 'desc':'essential quality'},{'id':'../../images/t3.jpg', 'desc':'simple curiosity'},
  							{'id':'../../images/t4.jpg', 'desc':'unmatched vision'},{'id':'../../images/t5.jpg', 'desc':'playful balance'},{'id':'../../images/t6.jpg', 'desc':'bold craftsmanship'},
                {'id':'../../images/t7.jpg', 'desc':'honed beauty'}, {'id':'../../images/t8.jpg', 'desc':'fresh twist'}, {'id':'../../images/t9.jpg', 'desc':'warm fit'}]

})

}());