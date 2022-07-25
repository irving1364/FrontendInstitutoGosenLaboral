(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalDeleteController', modalDeleteController);
	
	function modalDeleteController($scope, $mdDialog, $mdToast, locals,
									deleteNoteService) {

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
                cod:locals.cod,
                titulo:locals.titulo,
                imagen:locals.imagen
            };
        }

        function onSubmit(command){
        	console.log(command);
        	deleteNoteService.handle(command, deleteNoteSuccess, consultaFail);
        }
        	
        function deleteNoteSuccess(res){
        		console.log(res);
				var mensaje = res.response.descripcion;
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