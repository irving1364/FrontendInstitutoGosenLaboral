(function() {
	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.directive('historicos', historicos)		
		
		.factory('historicoMap', function() {
			console.log('histo');
			return function(orders, collapseAll) {


				return orders.map(function(order) {

					return new Historico(
						order,
						collapseAll
					);


				});

			}

		});		
		
	function historicos() {
		return {
			scope: {

				historico:'=',
				filtrar: '&'
			},
			controller: function($scope,confirmModal) {

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
					buscar:buscar	
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
			},	
	        templateUrl: 'app/coinex-app/use-cases/gestion-ordenes/directives/historicos/historicos.html',
        } 

	}

	function Historico(order , collapseAll) {

		angular.extend(this, order);
		this.collapseAll = collapseAll;
		this.collapseOut();
	}
	Historico.prototype = {
		
		collapseIn: function() {
			this.collapseAll();
			this.collapse = true;
			this.toggleIcon = 'icon-chevron-down';
		},
		collapseOut: function() {
			this.collapse = false;
			this.toggleIcon = 'icon-chevron-right'
		},
		onToggle: function() {

			if(this.collapse)
				this.collapseOut();
			else
				this.collapseIn();
		},


	}

})();