(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.estudiantes')
		.controller('modalEditEstudianteController', modalEditEstudianteController);
	
	function modalEditEstudianteController($scope, $mdDialog, $mdToast, locals,
											updateEstudianteService) {

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
			});
			console.log(locals);
			$scope.command = {
                cod:locals.estudiante.cod,
                cedula:locals.estudiante.cedula,
                nombres:locals.estudiante.nombres
            };
        }

        function onSubmit(command){
        	updateEstudianteService.handle(command, cursosSuccess, peticionFailed);
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