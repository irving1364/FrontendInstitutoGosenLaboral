(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.estudiantes')
		.controller('modalVerMateriaEstudianteController', modalVerMateriaEstudianteController);
			
			function modalVerMateriaEstudianteController($scope, $mdDialog, $mdToast, locals,
													  asignarEstudianteTablaCursoService) {
		
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

					$scope.command = [];
					$scope.command.cod_curso = '';

					$scope.command = {
						estudiante:locals.estudiante,
						cod_curso:locals.cod_curso,
					};

					var data = {	
						token:		   localStorage.getItem('token'),
						cod_anio:	   localStorage.getItem('cod_anio'),
						cod_estudiante:$scope.command.estudiante.cod,
						cod_curso:	   $scope.command.cod_curso
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/getMateriasEstudiante', data)
					.then(function (response) {
						// handle success
						$scope.materias = response.data.materias;
						$scope.materias.count = $scope.materias.length;
					})
					.catch(function (error) {
						peticionFailed();
					})  
				}
			
				function onSubmit(materia){
					console.log(materia);
					var data = {	
						token:		   localStorage.getItem('token'),
						cod_anio:	   localStorage.getItem('cod_anio'),
						cod_estudiante:materia.cod_estudiante,
						cod_curso_materia:	   materia.cod_curso_materia
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/deleteMateriaEstudiante', data)
					.then(function (response) {
						// handle success
						mensajeToast('Se Elimino la materia al curso del estudiante');
						close();
					})
					.catch(function (error) {
						peticionFailed();
					})  
				
				}
			
				function maestroSuccess(){
					close();
					mensajeToast('Se asignaron los estudiantes');
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