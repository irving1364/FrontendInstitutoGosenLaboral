(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.passwordAll')
		.controller('modalEditUsuarioController', modalEditUsuarioController);
	
	function modalEditUsuarioController($scope, $mdDialog, $mdToast, locals,
										reiniciarUserService) {

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
			$scope.command = {};
			$scope.command = locals.usuario;
			
        }

        function onSubmit(command){
        	reiniciarUserService.handle(command, cursosSuccess, peticionFailed);
        }
    
		function cursosSuccess(){
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