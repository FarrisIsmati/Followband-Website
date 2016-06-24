(function () {

  angular
    .module('followapp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/templates/tabs/tabs.view.html',
      controller: 'TabCtrl as tc'
    };
  }

})();