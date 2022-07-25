(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.cursos')
		.controller('modalAgregarCursoDetailController', modalAgregarCursoDetailController);
	
	function modalAgregarCursoDetailController($scope, $mdDialog, $mdToast, locals,
												asignarCursoService) {

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
			
			axios.get(localStorage.getItem("apiUrl") +'Tabla/getCursos')
			.then(function (response) {
				$scope.cursos = response.data.cursos;
				$scope.cursos.count = $scope.cursos.length;
			})
			.catch(function (error) {
				peticionFailed();
			})	

			axios.get(localStorage.getItem("apiUrl") +'Tabla/getSecciones')
			.then(function (response) {
				$scope.secciones = response.data.secciones;
				$scope.secciones.count = $scope.secciones.length;
			})
			.catch(function (error) {
				peticionFailed();
			})	

			
        }
	
        function onSubmit(command){
        	asignarCursoService.handle(command, cursosSuccess, peticionFailed);
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