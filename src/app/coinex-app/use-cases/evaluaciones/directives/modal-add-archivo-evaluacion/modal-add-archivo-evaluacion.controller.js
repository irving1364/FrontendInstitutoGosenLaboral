(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.evaluaciones')
		.controller('modalAddArchivoEvaluacionController', modalAddArchivoEvaluacionController);
	
	function modalAddArchivoEvaluacionController($scope, $mdDialog, $mdToast, locals,
										addEvaluacionService, getArchivoEvaluaMaestroService,
										borrarArchivoEvaluacionService, $http) {

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
				onSubmitDeleteFile:onSubmitDeleteFile,
				tabArchivos:tabArchivos
			});
		
			$scope.command = {};
			$scope.command.eva = locals.eva;
			console.log($scope.command.eva);
			$scope.urlEvaluaciones = localStorage.getItem("urlEvaluaciones");
		
		}

		function onSubmitDeleteFile(archivo){
			borrarArchivoEvaluacionService.handle(archivo, deleteSuccess, peticionFailed);
		}
	
        function onSubmit(command){
			console.log(command);
			
			var formData = new FormData();
            angular.forEach($scope.files,function(obj){
                if(!obj.isRemote){
					formData.append('token', localStorage.getItem('token'));
					formData.append('cod_evaluacion', $scope.command.eva.cod);
					formData.append('files[]', obj.lfFile);
                }
            });
			console.log(formData);
            $http.post(localStorage.getItem("apiUrl") +'Evaluacion/addArchivoEvaluacionMaestro', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(result){
                Success();                  
            },function(err){
                peticionFailed(err);
            });		
   
		}
    
		function tabArchivos(){
			getArchivoEvaluaMaestroService.handle($scope.command.eva, archivoSuccess, peticionFailed);
		}

		function archivoSuccess(response){
			$scope.archivos = response.archivos;
			
			for (var i = 1; i <= $scope.archivos.length; i++) {
				console.log($scope.archivos);
				var nombre = $scope.archivos[i - 1].archivo.split("/").pop()
				$scope.archivos[i - 1].nombre = nombre;
			}
		}

		function deleteSuccess(){
			tabArchivos();
			mensajeToast('Se elimino el archivo');
		}

		function Success(){
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