(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.año')
		.controller('modalAgregarCursoController', modalAgregarCursoController);
	
	function modalAgregarCursoController($scope, $mdDialog, $mdToast, locals,
										 addCursoService) {

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
        	addCursoService.handle(command, cursosSuccess, peticionFailed);
        }
    
		function cursosSuccess(){
			close();
			mensajeToast('Se realizo su cambio');
		}

		function peticionFailed(){
			mensajeToast('No se pudo completar su peticion HTTP');
		}   

		function mensajeToast(mensaje){
			var toastInstance = $mdToast.simple()
					.textContent(mensaje)
					.position('top-right')
					.hideDelay(6000);

			$mdToast.show(toastInstance);
		}			

		init();
	}

})();