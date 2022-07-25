(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.consejeros')
		.controller('modalAsignarConsejerosController', modalAsignarConsejerosController);
	
	function modalAsignarConsejerosController($scope, $mdDialog, $mdToast, locals,
											  asignarConsejeroCursoService) {

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

			$scope.command = {
                cod		:locals.curso.cod,
                curso 	:locals.curso.curso,
                seccion :locals.curso.seccion
            };

			var data = {	
				cod_anio:	   localStorage.getItem('cod_anio')
			  }; 

			  axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursoSeccionMateria', data)
				.then(function (response) {
					// handle success
					$scope.cursos = response.data.cursosMaterias;
				})
				.catch(function (error) {
					peticionFailed();
				})
				
			  axios.post(localStorage.getItem("apiUrl") +'Tabla/getMaestros', data)
				.then(function (response) {
					// handle success
					$scope.maestros = response.data.maestros;
				})
				.catch(function (error) {
					peticionFailed();
				})
        }
	
        function onSubmit(command){
			asignarConsejeroCursoService.handle(command, maestroSuccess, peticionFailed);
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