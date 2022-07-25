(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('gestionOrdenesController', gestionOrdenesController);

	function gestionOrdenesController($scope, $state, $rootScope) {

		angular.extend($scope, {
			transitionToComprar: transitionToComprar,
			transitionToVender: transitionToVender,
			transitionToHistoricoOrdenes: transitionToHistoricoOrdenes
		});

		function transitionToComprar() {
			cleanMarket();
			$state.go('app.gestionOrdenes.comprar');
		}	

		function transitionToVender() {
			cleanMarket();
			$state.go('app.gestionOrdenes.vender');
		}

		function transitionToHistoricoOrdenes() {
			cleanMarket();
			$state.go('app.gestionOrdenes.historicoOrdenes');
		}

		function cleanMarket() {
			$rootScope.$emit('market:reset', {});
		}
	
	}

})();