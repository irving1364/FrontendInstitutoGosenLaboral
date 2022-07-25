(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.materias')
		.controller('modalVerMateriasCursoController', modalVerMateriasCursoController);
	
	function modalVerMateriasCursoController($scope, $mdDialog, $mdToast, locals
												) {

		function close(materia) {
			console.log(materia)
			materia.num = 1;
			$mdDialog.hide(materia);
		}

		function closeBorrar(materia) {
			console.log(materia)
			materia.num = 2;
			$mdDialog.hide(materia);
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

			$scope.command = {
                cod:locals.curso.cod,
                curso:locals.curso.curso
            };
			
			var data = {	
				token:	   localStorage.getItem('token'),
                cod_curso:	   locals.curso.cod
			}; 

			axios.post(localStorage.getItem("apiUrl") +'Tabla/getMateriasCurso', data)
				.then(function (response) {
				// handle success
				$scope.materias 	  = response.data.materias;
				$scope.materias.count = $scope.materias.length;

			})
			.catch(function (error) {
				peticionFailed();
			})

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