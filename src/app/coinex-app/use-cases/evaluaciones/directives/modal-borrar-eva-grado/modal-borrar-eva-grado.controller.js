(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.evaluaciones')
		.controller('modalBorrarEvaluacionController', modalBorrarEvaluacionController);
	
	function modalBorrarEvaluacionController($scope, $mdDialog, $mdToast, locals,
											borrarEvaluacionService) {

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

			
			$scope.command = locals.eva;
			$scope.command.cod_curso_materia = locals.cod_curso_materia.cod;
			console.log($scope.command);
		}
		
        function onSubmit(command){
			borrarEvaluacionService.handle(command, Success, peticionFailed);
        }
    
		function Success(){
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