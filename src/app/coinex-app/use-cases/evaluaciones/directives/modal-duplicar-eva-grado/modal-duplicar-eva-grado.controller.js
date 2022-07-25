(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalDuplicarEvaGradoController', modalDuplicarEvaGradoController);
	
	function modalDuplicarEvaGradoController($scope, $mdDialog, $mdToast, locals,
											duplicarEvaluacionService) {

		function close(duplicadas) {
			$mdDialog.hide(duplicadas);
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
		
			console.log(locals.evalua);
			$scope.command = {};
			$scope.command = locals.eva;
			$scope.command.cod_materia = locals.cod_curso;
			
			var date = new Date();
			console.log(date);
			date.setDate(date.getDate() + -7);
			console.log(date);
			$scope.command.fechas = new Date($scope.command.fechas);
			console.log($scope.command.fechas);
			
		
			
			if (date > $scope.command.fechas) {
				mensajeToast('No se puede editar esta evaluacion porque la fecha es menor a la actual.');
				close();
			}

			var data = {	
				token:	     localStorage.getItem('token'),
				cod_anio:	 localStorage.getItem('cod_anio'),
				cod_materia: $scope.command.cod_materia.cod
			  }; 
			  axios.post(localStorage.getItem("apiUrl") +'Tabla/getMateriaDuplicarMaestro',data)
			  .then(function (response) {
				// handle success
				$scope.cursos = response.data.materias;
				$scope.cursos.count = $scope.cursos.length;
			  })
			  .catch(function (error) {
			  //  peticionFailed();
			  })
		}
	
        function onSubmit(selected){
			$scope.command.materias = selected;
			console.log($scope.command)
			duplicarEvaluacionService.handle($scope.command, maestroSuccess, peticionFailed);	
		}
    
		function maestroSuccess(response){
			close(response.duplicadas);
			mensajeToast('Se realizo su cambio');
		}

		function peticionFailed(response){
			console.log(response)
			mensajeToast(response.mensaje);
		}   

		function mensajeToast(mensaje){
			var toastInstance = $mdToast.simple()
					.textContent(mensaje)
					.position('top-right')
					.hideDelay(6000);

			$mdToast.show(toastInstance);
		}			

		
	function toggleLimitOptions() {
		$scope.limitOptions = $scope.limitOptions ? undefined : [15, 30, 50];
	};
	  
	
	function loadStuff() {
	  $scope.promise = $timeout(function () {
		// loading
	  }, 2000);
	}
	
	$scope.selected = [];
	  $scope.limitOptions = [];
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
	  $scope.query = {
		order: 'name',
		limit: 15,
		page: 1
	  };

		init();
	}


	

})();