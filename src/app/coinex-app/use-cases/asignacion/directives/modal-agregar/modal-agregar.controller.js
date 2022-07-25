(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAgregarController', modalAgregarController);
	
	function modalAgregarController($scope, $mdDialog, $mdToast, locals, $http
									) {

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
				text: {
					title: 'Crear boton de pago',
					botonCancelar: 'Cerrar',
					botonConfirmar: 'Confirmar'
				}
			});

			$scope.command = {
                carpeta_raiz:locals.carpeta_raiz
            };
        }

        $scope.$watch('files.length',function(newVal,oldVal){
            console.log($scope.files);
        });

        function onSubmit(){

        	var formData = new FormData();

            angular.forEach($scope.files,function(obj){
                if(!obj.isRemote){
                    formData.append('files[]', obj.lfFile);
                    formData.append("carpeta_raiz",$scope.command.carpeta_raiz);
                }
            });

            $http.post('https://parley.com.pa/driveBack/index.php/usuario/uploadImage', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(result){
                console.log(result); 
                if (result.data.code === 200) {
                	var mensaje = 'Su operacion se completo';
		            var toastInstance = $mdToast.simple()
		                  .textContent(mensaje)
		                  .position('top-right')
		                  .hideDelay(6000);

		            $mdToast.show(toastInstance);
		            close();
                }                
            },function(err){
                console.log(err);
                var mensaje = 'Algun error ocurrio';
		            var toastInstance = $mdToast.simple()
		                  .textContent(mensaje)
		                  .position('top-right')
		                  .hideDelay(6000);

		            $mdToast.show(toastInstance);
		            close();
            });

        //	deleteNoteService.handle(command, deleteNoteSuccess, consultaFail);
        }
        	
        function deleteNoteSuccess(res){
        		console.log(res);
				var mensaje = res.response.descripcion;
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);
	            $mdToast.show(toastInstance);
				close();	    
		}	

		function consultaFail() {
				var mensaje = 'Ocurrio un error al Consultar';
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);

	            $mdToast.show(toastInstance);
		}				

		init();
	}

})();