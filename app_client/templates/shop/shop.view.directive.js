(function () {

  angular
    .module('followapp')
    .directive('shopview', shopview);

  function shopview () {
	return {
        templateUrl: 'templates/shop/shop.view.html'
    }
  }

})();