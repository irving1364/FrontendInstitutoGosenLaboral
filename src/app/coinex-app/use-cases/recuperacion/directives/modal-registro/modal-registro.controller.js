(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.login')
		.controller('modalRegistroController', modalRegistroController);
	
	function modalRegistroController($scope, $mdDialog, $mdToast, locals, registroService
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

        }

        function onSubmit(command){

        	console.log(command);

        	console.log(command.pass === command.pass2);

        	if (command.pass === command.pass2) {

        		registroService.handle(command, registroSuccess, consultaFail);

        	} else {

        		var mensaje = 'Las contraseñas no coinciden';
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);
	            $mdToast.show(toastInstance);
	            
        	}

        	
        }        

		function registroSuccess() {
			var mensaje = 'Registro exitoso, Inicie sesión';
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