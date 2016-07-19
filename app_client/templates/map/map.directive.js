(function () {

  angular
    .module('followapp')
    .directive('DMSScope', DMSScope);

  function DMSScope ($window) {
    return {
      scope: {
      	DMSScope: "="
      },
      link: function ($scope, element, attrs){
      		$scope.ngResize = "Smith";
            $scope.$apply();
        });
    };
  }

})();