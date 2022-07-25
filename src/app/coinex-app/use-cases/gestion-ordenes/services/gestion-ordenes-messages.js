(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.factory('gestionOrdenesMessages', gestionOrdenesMessages);

	function gestionOrdenesMessages($mdToast) {

		return function(errors) {

			var mensajes = errors.map(function(error) {
				if(error['BUY_ORDER_EXECUTED']) {
					return mensaje('BUY_ORDER_EXECUTED ', 'Tu Orden N. ' +error['BUY_ORDER_EXECUTED'][0] +
					' Se ha ejecutado. '+error['BUY_ORDER_EXECUTED'][1] + ' '+error['BUY_ORDER_EXECUTED'][6] + 
					' fueron comprados a un precio de' +error['BUY_ORDER_EXECUTED'][2] + ' ' +error['BUY_ORDER_EXECUTED'][7]  );
				}

				if(error['SELL_ORDER_PARTLY_EXECUTED']) {
					return mensaje('SELL_ORDER_PARTLY_EXECUTED', 'Orden de venta parcialmente ejecutada');
				}
				if(error['SELL_ORDER_EXECUTED']) {
					return mensaje('SELL_ORDER_EXECUTED', 'Orden de compra executada');
				}
				if(error['BUY_ORDER_PARTLY_EXECUTED']) {
					return mensaje('SELL_ORDER_PARTLY_EXECUTED', 'Orden de venta parcialmente ejecutada');
				}
				if(error['PAUSE_TOO_SMALL_BALANCE']) {
					return mensaje('PAUSE_TOO_SMALL_BALANCE', 'Pausada por falta de balance');
				}

				
							
			});

			mensajes.forEach(function(mensaje) {
				mostrarMensaje(mensaje);
			});

		}

		function mensaje(key, value) {
			return {
				key: key,
				value: value
			}
		}

		function mostrarMensaje(mensaje) {

			if(!mensaje) return;


			var toastInstance = $mdToast.simple()
                       .textContent(mensaje.value)
                       .position('top-right')
                       .hideDelay(6000);

            $mdToast.show(toastInstance);
		}
	}

})();
