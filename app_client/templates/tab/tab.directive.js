(function () {

  angular
    .module('followapp')
    .directive('headertab', headertab);

  function headertab ($window) {
	return {
        restrict: 'E',
        template: '<div ng-include="templateUrl"></div>',
        link: function(scope) {

            $window.onresize = function() {
                changeTemplate();
                scope.$apply();
            };
            changeTemplate();

            function changeTemplate() {
                var screenWidth = $window.innerWidth;
                if (screenWidth < 1000) {
                    scope.templateUrl = 'templates/tab/tab.view.mobile.html';
                } else if (screenWidth >= 1000) {
                    scope.templateUrl = 'templates/tab/tab.view.html';
                }
            }
        }
    }
  }

})();