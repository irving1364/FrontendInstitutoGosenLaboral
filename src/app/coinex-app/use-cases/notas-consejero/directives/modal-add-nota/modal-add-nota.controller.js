(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAddNotaAptitudesController', modalAddNotaAptitudesController);
	
	function modalAddNotaAptitudesController($scope, $mdDialog, $mdToast, locals,
											addNotasConsejeroService) {

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

			$scope.datos = {
                cod_estudiante:		locals.estudiante.cod,
                cedula:				locals.estudiante.cedula,
                nombres:			locals.estudiante.nombres,
				cod_curso_detail:	locals.cod_curso,
				trimestre:			locals.trimestre
			};

			var data = {	
				token:			  	   localStorage.getItem('token'),
				cod_anio:			   localStorage.getItem('cod_anio'),
				cod_estudiante:		   $scope.datos.cod_estudiante,
				cod_curso_detail:	   $scope.datos.cod_curso_detail,
				trimestre:	   		   $scope.datos.trimestre
			}; 		
			
			axios.post(localStorage.getItem("apiUrl") +'Notas/getNotasAptitudesEstu',data)
			.then(function (response) {
			  // handle success
			  $scope.command = response.data.notas[0];
			  if($scope.command == undefined){
				$scope.command = {};
				$scope.command.observacion = '';
				console.log($scope.command);	
			  }
			})
			.catch(function (error) {
			  peticionFailed();
			})
		

		}
	
        function onSubmit(command){
			console.log(command);
			addNotasConsejeroService.handle(command, $scope.datos,  maestroSuccess, peticionFailed);
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