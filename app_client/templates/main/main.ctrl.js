var app = angular.module('followapp.mainCtrl', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ui.router'])

app.controller('Tabs', ['$scope', '$stateParams', '$state',
  function($scope, $stateParams, $state) {}
]);

app.controller('2ndTabCtrl', ['$scope', '$stateParams', '$state',
  function($scope, $stateParams, $state) {}
]);

app.controller('Tab1Link1Ctrl', ['$scope', '$stateParams', '$state',
  function($scope, $stateParams, $state) {
    $scope.link1things = ["A", "Set", "Of", "Things", "link1", "viewA"];
  }
]);

app.controller('Tab1Link2Ctrl', ['$scope', '$stateParams', '$state',
  function($scope, $stateParams, $state) {
    $scope.link2things = ["A", "Set", "Of", "Things", "link2", "viewA"];
  }
]);

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
	      image: '../../images/image' + i + '.jpg',
	      id: currIndex++
	    });
	  };

	  for (var i = 1; i < 4; i++) {
	    $scope.addSlide(i);
	  }

	  $scope.imagesRow1 = [{'id':'../../images/row11.jpg', 'desc':'follow stories'}, {'id':'../../images/row12.jpg', 'desc':'follow products'}, {'id':'../../images/row13.jpg', 'desc':'follow media'}]
	}
]);
