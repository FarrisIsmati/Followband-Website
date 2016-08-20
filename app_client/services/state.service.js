'use strict';

(function() {

  var app = angular.module("StateService", []);
  app.service('stateService', stateService);

  function stateService ($http) {

    var states = {
      shopProduct : { heading: "shopProduct", route: "shop.product", active:false },
      mapPage : { heading: "map", route:"follow.map", active:false },
      cartPage : { heading: "cart", route:"follow.cart", active:false },
      profilePage : { heading: "userprof", route:"follow.userprof", active:false    },
      registerPage : { heading: "register", routeLogin:"follow.register", active:false}
    }

    var getState = function(){
      return states;
    }

    var changeState = function(state, property){
      states.state.active = property;
    }

    return {
      getState : getState,
      changeState : changeState
    };
  }


})();