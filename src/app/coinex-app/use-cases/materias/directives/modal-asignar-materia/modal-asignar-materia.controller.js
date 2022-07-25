(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.año')
		.controller('modalAsignarMateriaController', modalAsignarMateriaController);
	
	function modalAsignarMateriaController($scope, $mdDialog, $mdToast, locals,
											asignarMateriaCursoService) {

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

			axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursoSeccion', data)
			.then(function (response) {
				// handle success
				$scope.cursosSeccion = response.data.cursosSeccion;
				$scope.cursosSeccion.count = $scope.cursosSeccion.length;
			})
			.catch(function (error) {
				peticionFailed();
			})
				
			  axios.post(localStorage.getItem("apiUrl") +'Tabla/getMaterias', data)
				.then(function (response) {
					// handle success
					$scope.materias = response.data.materias;
					$scope.materias.count = $scope.materias.length;
				})
				.catch(function (error) {
					peticionFailed();
				})
        }
	
        function onSubmit(command){
        	asignarMateriaCursoService.handle(command, materiaSuccess, peticionFailed);
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