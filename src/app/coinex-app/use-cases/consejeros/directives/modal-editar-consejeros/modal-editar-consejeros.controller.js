(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.año')
		.controller('modalEditMateriaController', modalEditMateriaController);
	
	function modalEditMateriaController($scope, $mdDialog, $mdToast, locals,
										updateMateriaService) {

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
                cod:locals.materia.cod,
                materia:locals.materia.materia
            };
        }

        function onSubmit(command){
        	updateMateriaService.handle(command, materiaSuccess, peticionFailed);
        }
    
		function materiaSuccess(){
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