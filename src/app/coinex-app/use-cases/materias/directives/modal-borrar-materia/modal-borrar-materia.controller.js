(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.materias')
		.controller('modalBorrarMateriasController', modalBorrarMateriasController);
	
	function modalBorrarMateriasController($scope, $mdDialog, $mdToast, locals,
											deleteMateriaAsignadaService) {

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

			$scope.command = locals.materia;
        }
	
        function onSubmit(command){
			deleteMateriaAsignadaService.handle(command, maestroSuccess, peticionFailed);
        }
    
		function maestroSuccess(){
			close();
			mensajeToast('Se realizo su cambio');
		}

		function peticionFailed(response){
			console.log(response)
			mensajeToast(response.mensaje);
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