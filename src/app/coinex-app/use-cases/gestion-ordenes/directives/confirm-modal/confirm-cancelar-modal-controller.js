(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('confirmCancelarModalController', confirmCancelarModalController);
	
	function confirmCancelarModalController($scope, $mdDialog, orden, 
		 $mdToast,orderCancel) {

		angular.extend($scope, {
			close: close,
			cancel: cancel,
			orden: orden,
			execute:execute,
			text: {
				title: 'Cancelar Orden',
				textContent :'¿Realmente desea cancelar el número de pedido',
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
			orderCancel.handle(
				{ ordernumber: $scope.orden },
		   		cancelSucces,
			   	cancelFail
		   	);

		}

		function cancelSucces(response) {
	        close();
		}

		function cancelFail(response) {
			console.log('fail');
		}
	}

})();