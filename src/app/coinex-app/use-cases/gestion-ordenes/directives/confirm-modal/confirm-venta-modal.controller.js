(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('confirmVentaModalController', confirmVentaModalController);

	function confirmVentaModalController($scope, $mdDialog, orden, 
		transitionToTransactions, sellService, $mdToast,gestionOrdenesMessages,
		ordersService) {

		angular.extend($scope, {
			close: close,
			cancel: cancel,
			orden: orden,
			execute: execute,
			transitionToTransactions: transitionToTransactions,
			text: {
				title: 'Confirmar venta',
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
			console.log($scope.orden.toSell());
			sellService.handle(
				$scope.orden.toSell(), 
				executeSuccess,
				executeFailed
			);

		}

		function executeSuccess(response) {

			console.log('executeSuccess', response.mensajes);

	        	var mensajesCollection = response.mensajes;

				//$scope.transitionToTransactions().then(function() {

					mensajesCollection.forEach(function(mensajeItem) {
						var toastInstance = $mdToast.simple()
					        .textContent(mensajeItem.mensaje)
					        .position('top-right')
					        .hideDelay(6000);

		       			$mdToast.show(toastInstance);
					});

				//});
				console.log($scope.orden.toSell());
				var venta = $scope.orden.toSell();

				updateOrders({
					  //markets: venta.market,
	       			  sortBy: "ordernumber",
			          sortDirection: "desc",
			          pagesize: 5,
			          pagenumber: 1,
		        });

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

			var mensajesCollection = response.mensajes;

			console.log('executeFailed', response);

			mensajesCollection.forEach(function(mensajeItem) {

				var toastInstance = $mdToast.simple()
			        .textContent(mensajeItem.mensaje)
			        .position('top-right')
			        .hideDelay(6000);

       			$mdToast.show(toastInstance);


			});


		}

	}
})();