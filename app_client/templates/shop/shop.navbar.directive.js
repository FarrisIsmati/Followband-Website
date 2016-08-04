(function () {

  angular
    .module('followapp')
    .directive('shopNavbar', shopNavbar);

  function shopNavbar () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/shop/shop.navbar.view.html',
    };
  }

})();