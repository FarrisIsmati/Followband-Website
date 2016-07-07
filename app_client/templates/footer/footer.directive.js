(function () {

  angular
    .module('followapp')
    .directive('footer', footer);

  function footer () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/footer/footer.view.html',
    };
  }

})();