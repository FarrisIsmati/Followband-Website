(function () {

  angular
    .module('followapp')
    .directive('templatehold', templatehold);

  function templatehold ($window) {
	return {
        restrict: 'E',
        template: '<div ng-include="templateUrl"></div>',
        link: function(scope, element, attrs) {
            var w = angular.element($window);
            w.on('resize', function(e) {
              changeTemplate();
              scope.$apply();
            });
            var templates = scope.$eval(attrs.templates);
            changeTemplate();

            function changeTemplate() {
              var screenWidth = $window.innerWidth;
              if (screenWidth < 850) {
                scope.templateUrl = templates[0];
              } else if (screenWidth >= 850) {
                scope.templateUrl = templates[1];
              }
            }
        }
    }
  }

})();

