(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.estudiantes')
		.controller('modalAsignarMateriaEstudianteController', modalAsignarMateriaEstudianteController);
			
			function modalAsignarMateriaEstudianteController($scope, $mdDialog, $mdToast, locals,
															asignarMateriaEstudiantesService) {
		
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
						getMaterias:getMaterias
					});

					$scope.command = [];
					$scope.command.cod_curso = '';

					$scope.selected = [];
					$scope.limitOptions = [5, 10, 15];
					$scope.options = {
						rowSelection: true,
						multiSelect: true,
						autoSelect: true,
						decapitate: false,
						largeEditDialog: true,
						boundaryLinks: true,
						limitSelect: true,
						pageSelect: true
					};

					console.log(locals);
					$scope.command = {
						estudiantes:locals.estudiante,
						cod_curso:locals.cod_curso
					};
					console.log($scope.command);

					var data = {	
						token:		   localStorage.getItem('token'),
						cod_anio:	   localStorage.getItem('cod_anio')
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursosDetail', data)
					.then(function (response) {
						// handle success
						$scope.cursos = response.data.cursos;
						$scope.cursos.count = $scope.cursos.length;
					})
					.catch(function (error) {
						peticionFailed();
					})  
				
				}
			
				function getMaterias(cod_curso){
					var data = {	
						token:		   localStorage.getItem('token'),
						cod_curso:	   cod_curso
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/getMateriasCurso', data)
					.then(function (response) {
						// handle success
						$scope.materias = response.data.materias;
						$scope.materias.count = $scope.materias.length;
					})
					.catch(function (error) {
						peticionFailed();
					})
				}
				
				function onSubmit(materias){
					var command = {
						materias: 		materias,
						cod_estudiante: $scope.command.estudiantes.cod,
						cod_curso: 		$scope.command.cod_curso
					};
					asignarMateriaEstudiantesService.handle(command, maestroSuccess, peticionFailed);
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