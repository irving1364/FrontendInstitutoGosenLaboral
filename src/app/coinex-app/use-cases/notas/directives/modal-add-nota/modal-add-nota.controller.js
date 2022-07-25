(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAddNotaController', modalAddNotaController);
	
	function modalAddNotaController($scope, $mdDialog, $mdToast, locals,
									addNotasService) {

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
                cod_estudiante:		locals.estudiante.cod,
                cedula:				locals.estudiante.cedula,
                nombres:			locals.estudiante.nombres,
				cod_curso_materia:	locals.cod_curso_materia,
				nota1:				0,
				nota2:				0,
				nota3:				0,
				ausencia1:			0,
				ausencia2:			0,
				ausencia3:			0,
				tardanza1:			0,
				tardanza2:			0,
				tardanza3:			0
			};

			var data = {	
				token:			  	   localStorage.getItem('token'),
				cod_anio:			   localStorage.getItem('cod_anio'),
				cod_estudiante:		   $scope.command.cod_estudiante,
				cod_curso_materia:	   $scope.command.cod_curso_materia
			}; 		
			
			axios.post(localStorage.getItem("apiUrl") +'Notas/getNotasEstu',data)
			.then(function (response) {
			  // handle success
			  $scope.command.nota1 = parseFloat(response.data.notas[0].nota1);
			  $scope.command.nota2 = parseFloat(response.data.notas[0].nota2);
			  $scope.command.nota3 = parseFloat(response.data.notas[0].nota3);
			  $scope.command.ausencia1 = parseInt(response.data.notas[0].ausencia1);
			  $scope.command.ausencia2 = parseInt(response.data.notas[0].ausencia2);
			  $scope.command.ausencia3 = parseInt(response.data.notas[0].ausencia3);
			  $scope.command.tardanza1 = parseInt(response.data.notas[0].tardanza1);
			  $scope.command.tardanza2 = parseInt(response.data.notas[0].tardanza2);
			  $scope.command.tardanza3 = parseInt(response.data.notas[0].tardanza3);
			   
			  
			  console.log($scope.command);
			})
			.catch(function (error) {
//			  peticionFailed();
			})
		

		}
	
        function onSubmit(command){
			console.log(command);
			addNotasService.handle(command, maestroSuccess, peticionFailed);
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