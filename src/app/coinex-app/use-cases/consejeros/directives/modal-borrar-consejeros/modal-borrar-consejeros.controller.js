(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.consejeros')
		.controller('modalBorrarConsejeroController', modalBorrarConsejeroController);
	
	function modalBorrarConsejeroController($scope, $mdDialog, $mdToast, locals,
												deleteConsejeroCursoService) {

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

			console.log(locals);
			$scope.command = locals.consejero;
        }
	
        function onSubmit(command){
			deleteConsejeroCursoService.handle(command, maestroSuccess, peticionFailed);
        }
    
		function maestroSuccess(){
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