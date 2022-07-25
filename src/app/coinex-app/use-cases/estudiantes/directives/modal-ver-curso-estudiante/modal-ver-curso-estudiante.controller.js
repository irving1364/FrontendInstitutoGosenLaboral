(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.estudiantes')
		.controller('modalVerCursoEstudianteController', modalVerCursoEstudianteController);
			
			function modalVerCursoEstudianteController($scope, $mdDialog, $mdToast, locals,
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

					console.log(locals);
					$scope.command = {
						estudiantes:locals.estudiantes
					};

					var data = {	
						token:		   localStorage.getItem('token'),
						cod_anio:	   localStorage.getItem('cod_anio'),
						cod_estudiante:$scope.command.estudiantes.cod
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursoEstudiante', data)
					.then(function (response) {
						// handle success
						$scope.cursosEstudiante = response.data.cursosEstudiante;
						$scope.cursosEstudiante.count = $scope.cursosEstudiante.length;
					})
					.catch(function (error) {
						peticionFailed();
					})  
				

				}
			
				function onSubmit(command){
					asignarEstudianteTablaCursoService.handle(command, maestroSuccess, peticionFailed);
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