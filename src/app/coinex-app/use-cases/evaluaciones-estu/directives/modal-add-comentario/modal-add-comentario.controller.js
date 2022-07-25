(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAddComentarioController', modalAddComentarioController);
	
	function modalAddComentarioController($scope, $mdDialog, $mdToast, locals,
										addEvaluacionService, $http, updateEvaluacionComentarioEstuService) {

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
		
			$scope.command = {};
			$scope.command.eva = locals.eva;
			console.log($scope.command.eva);
		
			var data = {	
				token:	    	 localStorage.getItem('token'),
				cod_anio:		 localStorage.getItem('cod_anio'),
				cod_evaluacion:	 $scope.command.eva.cod
			  }; 
	
			  axios.post(localStorage.getItem("apiUrl") +'evaluacion/getevaluacionCodEstudiante', data)
			  .then(function (response) {
				console.log(response.data);
				$scope.command.comentario = response.data.evaluacionEstu[0].comentario_estu;
			  })
			  .catch(function (error) {
				peticionFailed();
			  });

			
		}
	
        function onSubmit(command){
			console.log(command);
			updateEvaluacionComentarioEstuService.handle(command, Success, peticionFailed);
		}
    
		function Success(){
			close();
			mensajeToast('Se realizo su cambio');
		}

		function peticionFailed(response){
			console.log(response)
			mensajeToast('Ocurrio un error');
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