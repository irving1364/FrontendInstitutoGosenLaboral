(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAusenciaTardanzaController', modalAusenciaTardanzaController);
	
	function modalAusenciaTardanzaController($scope, $mdDialog, $mdToast, locals,
											 editarAuseTardaEvaluaService) {

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
		
			console.log(locals.eva);
			$scope.command = {};
			$scope.command = locals.eva;
			console.log($scope.command);
			
		}
	
        function onSubmit(command){
			editarAuseTardaEvaluaService.handle(command, maestroSuccess, peticionFailed);			
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