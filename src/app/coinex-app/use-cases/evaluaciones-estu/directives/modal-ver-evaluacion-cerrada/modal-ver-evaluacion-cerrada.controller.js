(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.evaluacionesEstu')
		.controller('modalVerEvaluacionCerradaController', modalVerEvaluacionCerradaController);
	
	function modalVerEvaluacionCerradaController($scope, $mdDialog, $mdToast, locals,
												getArchivoEvaluaCorreccionesMaestroService
												) {

		function close() {
			console.log();
			$mdDialog.hide();
		}


		function cancel() {
			$mdDialog.cancel('cancel');
		}

		function init (){
			angular.extend($scope, {
				close: close,
				cancel: cancel,	
				onSubmit:onSubmit,
				onBorrar:onBorrar
			});

			$scope.urlEvaluaciones = localStorage.getItem("urlEvaluaciones");
			$scope.command = locals.eva;
			console.log($scope.command);
			getArchivoEvaluaCorreccionesMaestroService.handle($scope.command, success, peticionFailed);
		}

		function success(response){
			$scope.archivos = response.archivos;
			
			for (var i = 1; i <= $scope.archivos.length; i++) {
				console.log($scope.archivos);
				var nombre = $scope.archivos[i - 1].archivo.split("/").pop()
				$scope.archivos[i - 1].nombre = nombre;
			}
		}
	
        function onSubmit(materia){
			close(materia);
        }

		function onBorrar(materia){
			materia.curso = $scope.command.curso;
			closeBorrar(materia);
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