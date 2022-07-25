(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAddArchivoCommentController', modalAddArchivoCommentController);
	
	function modalAddArchivoCommentController($scope, $mdDialog, $mdToast, locals,
										addEvaluacionService, $http) {

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
            $http.post(localStorage.getItem("apiUrl") +'Evaluacion/addArchivoEvaluacionEstu', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(result){
                Success();                  
            },function(err){
                peticionFailed(err);
            });		
   
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