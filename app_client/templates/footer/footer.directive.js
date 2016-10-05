(function () {

  angular
    .module('followapp')
    .directive('footer', footer);

  function footer () {
    return {
      restrict: 'EA',
      template: '<templatehold templates="footerview"></templatehold>',
      controller: 'FooterCtrl',
    };
  }

})();