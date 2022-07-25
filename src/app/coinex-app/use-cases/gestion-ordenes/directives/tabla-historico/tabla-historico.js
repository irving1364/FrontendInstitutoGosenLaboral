(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.directive('tablaHistorico', tablaHistorico);

	function tablaHistorico() {

		var templateUrl = 'app/coinex-app/use-cases/gestion-ordenes/'
			.concat('directives/tabla-historico/tabla-historico.html');

		return {
			scope: {
				orders:"=",
				filtrar: '&'
			},
			controller: function($scope, confirmModal) {

				angular.extend($scope, {
					modalCancelOrden: modalCancelOrden,
					command: {
						abiertas:'',
						ejecutadas:'',
						canceladas:'',
						pausadas:'',
						compra:'',
						venta:'',
						desde:'',
						hasta:'',
						cantidadRegistro:'',
					},
					buscar: buscar
				});
				
				function buscar() {
					$scope.filtrar({command: $scope.command});
				}

				function modalCancelOrden(orden,ev) {
					var templateUrl = [
						'app/coinex-app/use-cases/gestion-ordenes/',
						'directives/confirm-modal/confirm-cancel-order-modal.html'
					].join('');
					confirmModal({
						templateUrl: templateUrl,
						locals: {
							orden: orden,
						},
			      		controller: 'confirmCancelarModalController',
			      		close: function(e) {
			      			$scope.filtrar({command: $scope.command});
			      		},
			      		cancel: function(e) {
			      			//console.log('cancel', e);
			      		},
				      	targetEvent: ev,
					});
				};
				
				function cancel(orden) {
					console.log('asd');
				};	


			},
			templateUrl: templateUrl
		}
	}


})();