(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('modalFactory', modalFactory);

	 function modalFactory($mdDialog) {

        var modals = {

            fiat: function(command) {
                console.log(command);
                $mdDialog.show({
                    locals: command.locals,
                      controller: modalFiatController,
                      templateUrl: 'app/coinex-app/use-cases/dashboard/directives/carteras/modalFiat.html',
                      parent: angular.element(document.body),
                      targetEvent: command.ev,
                      clickOutsideToClose:true,
                      fullscreen: true // Only for -xs, -sm breakpoints.
                })
                
                .then(command.close, command.hide);
            },

            cripto: function(command) {
                $mdDialog.show({
                    locals: command.locals,
                      controller: modalCryotomonedaController,
                      templateUrl: 'app/coinex-app/use-cases/dashboard/directives/carteras/modalCryptomoneda.html',
                      parent: angular.element(document.body),
                      targetEvent: command.ev,
                      clickOutsideToClose:true,
                      fullscreen: true // Only for -xs, -sm breakpoints.
                })
                
                .then(command.close, command.hide);
            }
        }

        return function(name) {
            return modals[name];
        }
    }
    
    function modalFiatController($scope, $mdDialog, balance) {
        angular.extend($scope, {
            balance:balance,
            hide: hide,
            close: close
        });
        function hide() {
             $mdDialog.hide({someObject: 'jhkjsfdhkjdsfhskdfsd'});
        }
        function close() {
            $mdDialog.cancel();
        }
        function envio() {
            alert('llega envio');
        }
    }

    function modalCryotomonedaController($scope, $mdDialog, balance) {
        angular.extend($scope, {
            balance:balance,
            hide: hide,
            close: close,
            envio: envio
        });
        function hide() {
             $mdDialog.hide({someObject: 'jhkjsfdhkjdsfhskdfsd'});
        }
        function close() {
            $mdDialog.cancel();
        }
        function envio() {
            alert('llega envio');
        }
    }
   
})();
