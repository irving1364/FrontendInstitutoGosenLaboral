(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('comprarController', comprarController);

	function comprarController($scope, balanceService, 
		orden, bestOferrService, confirmModal, 
		$state, $mdToast, $rootScope) {

		function init() {

			angular.extend($scope, {
				confirm: confirm
			});

			//load wallets
			balanceService.handle({}, function(response) {
				setOrden(response);
			});

		}

		function setOrden(wallets) {

			$scope.orden = new orden(wallets, 'COMPRA', $rootScope);

			$scope.orden.setBestOferrService(bestOferrService);

			$scope.orden.setText({
				wallets: {
					title: 'Carteras'
				},
				cantidadNominal: {
					label: 'Cantidad a comprar',
					placeholder: 'Ingrese cantidad a comprar',
					errors: {
						number: 'La cantidad debe ser un numero valido',
						required: 'La cantidad es requerida'
					}
				},
				currencyLimit: {
					label: 'Moneda intercambio',
				},
				cantidadLimite: {
					label: 'Precio a pagar por cada:',
					errors: {
						number: 'El precio debe ser un numero valido',
						required: 'El precio es requerido'
					}
				},
				limite: {
					label: 'Limite',
					mercado: 'Al mercado',
					custom: 'Yo establezco el precio'
				},
				saldoRequerido: {
					label: 'Saldo requerido aproximado:'
				},
				saldoInsuficiente: {
					label: 'Si el saldo es insuficiente',
					pausar: 'Pausar orden',
					cancelar: 'Cancelar'
				},
				accion: 'Comprar'
			});

		}

		function confirm(ev) {

			var templateUrl = [
				'app/coinex-app/use-cases/gestion-ordenes/',
				'directives/confirm-modal/confirm-modal.html'
			].join('');

			confirmModal({
				templateUrl: templateUrl,
				locals: {
					orden: $scope.orden,
					transitionToTransactions: transitionToTransactions
				},
	      		controller: 'confirmCompraModalController',
	      		close: function(e) {
	      			$scope.orden.cleanAll();
	      		},
	      		cancel: function(e) {
	      			console.log('cancel', e);
	      		},
		      	targetEvent: ev,
			});

		}

		function transitionToTransactions() {
			
			var stateName = 'app.gestionOrdenes.historicoOrdenes';

			return $state.go(stateName);

		}

	

		init();

	}

})();