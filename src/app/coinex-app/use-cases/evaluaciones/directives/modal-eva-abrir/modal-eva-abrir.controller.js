(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.evaluaciones')
		.controller('modalEvaAbrirController', modalEvaAbrirController);
	
	function modalEvaAbrirController($scope, $mdDialog, $mdToast, locals,
									 updateStatusEvaluacionService) {

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
			console.log($scope.command);
		}
		
        function onSubmit(command){
			updateStatusEvaluacionService.handle(command, Success, peticionFailed);
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