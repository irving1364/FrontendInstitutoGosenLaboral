(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.año')
		.controller('modalEditarMateriaController', modalEditarMateriaController);
	
	function modalEditarMateriaController($scope, $mdDialog, $mdToast, locals,
											editarMateriaPrioridadService) {

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
			var data = {	
				cod_anio:	   localStorage.getItem('cod_anio')
			}; 

			$scope.command = {
                cod				:locals.materia.cod,
				cod_curso_detail:locals.materia.cod_curso_detail,
                materia			: locals.materia.materia,
                prioridad		: parseInt(locals.materia.prioridad)
            };
			console.log($scope.command);	
			
        }
	
        function onSubmit(command){
        	editarMateriaPrioridadService.handle(command, materiaSuccess, peticionFailed);
        }
    
		function materiaSuccess(response){
			close();
			mensajeToast('Se realizo su cambio');
		}

		function peticionFailed(response){
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