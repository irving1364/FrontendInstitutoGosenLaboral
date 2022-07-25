(function() {
    
    'use strict';

    angular
        .module('coinex-app.directives')
        .directive('contrasenaValidacion', contrasenaValidacion);

    function contrasenaValidacion() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$parsers.push(customValidator);
            }
        };
    }

    function customValidator(ngModelValue) {

        if (/[A-Z]/.test(ngModelValue)) {
            ctrl.$setValidity('uppercaseValidator', true);
        } else {
            ctrl.$setValidity('uppercaseValidator', false);
        }
      
        if (/[@]/.test(ngModelValue)) {
            ctrl.$setValidity('arrobaValidator', true);
        } else {
            ctrl.$setValidity('arrobaValidator', false);
        }
      
        if (ngModelValue.length === 10) {
            ctrl.$setValidity('sixCharactersValidator', true);
        } else {
            ctrl.$setValidity('sixCharactersValidator', false);
        }
      
        return ngModelValue;
    }

})();