(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAddPuntuacionController', modalAddPuntuacionController);
	
	function modalAddPuntuacionController($scope, $mdDialog, $mdToast, locals,
											addPuntuacionService) {

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
		
			console.log(locals.evalua);
			$scope.command = {};
			$scope.command = locals.evalua;
			$scope.command.puntuacion = parseFloat($scope.command.puntuacion);
			console.log($scope.command);
			
			var date = new Date();
			console.log(date);
			$scope.command.fechas = new Date($scope.command.fechas);
			console.log($scope.command.fechas);
			
			if (date > $scope.command.fechas) {
				mensajeToast('No se puede editar esta evaluacion porque la fecha es menor a la actual.');
				close();
			}

		}
	
        function onSubmit(command){
				console.log(command);
				addPuntuacionService.handle(command, maestroSuccess, peticionFailed);
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