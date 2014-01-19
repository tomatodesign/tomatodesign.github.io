'use strict';

/* Directives */


angular.module('tomato.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('preventedClick', [function() {
    return function(scope, element, attrs) {
      $(element).click(function(event) {
        event.preventDefault();
      });
    }
  }])