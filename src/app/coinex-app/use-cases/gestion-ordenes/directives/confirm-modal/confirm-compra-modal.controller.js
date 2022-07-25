(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('confirmCompraModalController', confirmCompraModalController);



	function confirmCompraModalController($scope, $mdDialog, orden, 
		buyService, transitionToTransactions, $mdToast,gestionOrdenesMessages,
		ordersService) {
		
		angular.extend($scope, {
			close: close,
			cancel: cancel,
			orden: orden,
			execute: execute,
			transitionToTransactions: transitionToTransactions,
			text: {
				title: 'Confirmar Compra',
				cantidadNominal: 'Cantidad a vender',
				cantidadLimite: 'Precio limite',
				notificacionPNC: [
					'Las ordenes y pedidos parciales',
					'que exedan su saldo se cancelan'
				].join(' '),
				botonCancelar: 'Cancelar',
				botonConfirmar: 'Confirmar'
			}
		});

		function close() {
		 	$mdDialog.hide('close');
		}
		function cancel() {
			$mdDialog.cancel('cancel');
		}
		function execute() {

			$scope.close();

			buyService.handle(
				$scope.orden.toBuy(), 
				executeSuccess,
				executeFailed
			);
		}
		function executeSuccess(response) {

			var mensajesCollection = response.mensajes;

			//$scope.transitionToTransactions().then(function() {

				mensajesCollection.forEach(function(mensajeItem) {
					var toastInstance = $mdToast.simple()
				        .textContent(mensajeItem.mensaje)
				        .position('top-right')
				        .hideDelay(6000);

	       			$mdToast.show(toastInstance);
				});
				console.log($scope.orden);
				for (var i = 1; i <= 3; i++) {
					console.log(i);
					updateOrders({
						  markets: $scope.orden.market,
		       			  sortBy: "ordernumber",
				          sortDirection: "desc",
				          pagesize: 5,
				          pagenumber: 1,
			        });	
				}
				

		}
		
	
		function updateOrders(params) {
	      ordersService.handle(
					params, 
					updateOrdersSuccess,
					updateOrdersFailed
				);
	      
			}

		function updateOrdersSuccess(response) {
			if (response.info >0) {	
				gestionOrdenesMessages(response.info);
			}
		}

		function updateOrdersFailed(response) {
			console.log(response);
		}

		function executeFailed(response) {	
			console.log(response);

			var mensajesCollection = response.mensajes;

			/*
			mensajesCollection.forEach(function(mensajeItem) {

				var toastInstance = $mdToast.simple()
			        .textContent(mensajeItem.mensaje)
			        .position('top-right')
			        .hideDelay(6000);

       			$mdToast.show(toastInstance);
	

			});*/

		}
	}

})();