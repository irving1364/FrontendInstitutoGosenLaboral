(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalCarpetaController', modalCarpetaController);
	
	function modalCarpetaController($scope, $mdDialog, $mdToast, locals, crearCarpService
									) {

		function close() {
			
			$mdDialog.hide('close');
		}

		function cancel() {

			$mdDialog.cancel('cancel');
		}

		function init (){

			angular.extend($scope, {
				close: close,
				cancel: cancel,	
				onSubmit:onSubmit,
				text: {
					title: 'Crear boton de pago',
					botonCancelar: 'Cerrar',
					botonConfirmar: 'Confirmar'
				}
			});

			$scope.command = {
                carpeta_raiz_original:locals.carpeta_raiz
            };

            console.log($scope.command)
        }

        function onSubmit(command){
        	console.log(command);
        	command.carpeta = $scope.command.carpeta_raiz_original + command.carpeta;
        	console.log(command.carpeta);
        	crearCarpService.handle(command, crearCarpSuccess, consultaFail);
        
        }
        	
        function crearCarpSuccess(res){
        		console.log(res);
				var mensaje = res.response.msj;
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);
	            $mdToast.show(toastInstance);
				close();	    
		}	

		function consultaFail() {
				var mensaje = 'Ocurrio un error al Consultar';
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);

	            $mdToast.show(toastInstance);
		}				

		init();
	}

})();