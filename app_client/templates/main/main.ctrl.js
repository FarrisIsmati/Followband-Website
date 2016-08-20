var app = angular.module('MainCtrl', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ui.router'])

app.controller('MainCtrl', ['$scope', function($scope){
	  // Carousel
	  $scope.myInterval = 20000;
	  $scope.noWrapSlides = false;
	  $scope.active = 0;
	  var slides = $scope.slides = [];
	  var currIndex = 0;

	  $scope.addSlide = function(i) {
	    var newWidth = screen.width + slides.length + 1;
	    slides.push({
	      image: '../../images/Carousel/image' + i + '.jpg',
	      id: currIndex++
	    });
	  };

	  for (var i = 1; i < 4; i++) {
	    $scope.addSlide(i);
	  }

	}
]);
