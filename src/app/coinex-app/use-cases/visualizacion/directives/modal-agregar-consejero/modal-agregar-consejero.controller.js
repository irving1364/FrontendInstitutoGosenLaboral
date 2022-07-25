(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.año')
		.controller('modalAgregarMaestroController', modalAgregarMaestroController);
	
	function modalAgregarMaestroController($scope, $mdDialog, $mdToast, locals,
											addMaestroService) {

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
				onSubmit:onSubmit
			});
        }
	
        function onSubmit(command){
        	addMaestroService.handle(command, maestroSuccess, peticionFailed);
        }
    
		function maestroSuccess(){
			close();
			mensajeToast('Se creo el Maestro');
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