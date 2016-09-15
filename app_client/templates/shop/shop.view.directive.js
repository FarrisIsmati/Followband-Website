(function () {

  angular
    .module('followapp')
    .directive('shopview', shopview);

  function shopview ($window) {
	return {
        //templateUrl: 'templates/shop/shop.view.html'

        template: '<div ng-include="templateUrl"></div>',
        link: function(scope) {

            $window.onresize = function() {
                console.log(scope.templateUrl);
                changeTemplate();
                scope.$apply();
            };
            changeTemplate();

            function changeTemplate() {
                var screenWidth = $window.innerWidth;
                if (screenWidth < 1200) {
                    scope.templateUrl = 'templates/shop/shop.view.mobile.html';
                } else if (screenWidth >= 1200) {
                    scope.templateUrl = 'templates/shop/shop.view.html';
                }
            }
        }

    }
  }

})();
