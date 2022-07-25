(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.año')
		.controller('modalEditCursoController', modalEditCursoController);
	
	function modalEditCursoController($scope, $mdDialog, $mdToast, locals,
									  updateCursoService) {

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
                cod:locals.curso.cod,
                curso:locals.curso.curso
            };
        }

        function onSubmit(command){
        	updateCursoService.handle(command, cursosSuccess, peticionFailed);
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