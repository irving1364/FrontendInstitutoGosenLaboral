(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.estudiantes')
		.controller('modalAddEstudiantesController', modalAddEstudiantesController);
			
			function modalAddEstudiantesController($scope, $mdDialog, $mdToast, locals,
													addEstudianteService) {
		
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
				}
			
				function onSubmit(command){
					addEstudianteService.handle(command, maestroSuccess, peticionFailed);
				}
			
				function maestroSuccess(){
					close();
					mensajeToast('Se creo el Maestro');
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