(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('venderController', venderController);

	function venderController($scope, balanceService, orden, bestOferrService, sellService, 
		confirmModal, $state, $mdToast, $rootScope) {

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

			$scope.orden = new orden(wallets, 'VENTA', $rootScope);

			$scope.orden.setBestOferrService(bestOferrService);

			$scope.orden.setText({
				wallets: {
					title: 'Carteras'
				},
				cantidadNominal: {
					label: 'Cantidad a vender',
					placeholder: 'Ingrese cantidad a vender',
					errors: {
						number: 'La cantidad debe ser un numero valido',
						required: 'La cantidad es requerida'
					}
				},
				currencyLimit: {
					label: 'Moneda intercambio',
				},
				cantidadLimite: {
					label: 'Precio de venta:',
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
				accion: 'Vender'
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
	      		controller: 'confirmVentaModalController',
	      		close: function(e) {
	      			$scope.orden.cleanAll();
	      		},
	      		cancel: function(e) {
	      			console.log('cancel', e);
	      		},
		      	targetEvent: ev,
			});

		}

		function transitionToTransactions(toastInstance) {
			
			var stateName = 'app.gestionOrdenes.historicoOrdenes';

			return $state.go(stateName);

		}

		init();

	}


})();