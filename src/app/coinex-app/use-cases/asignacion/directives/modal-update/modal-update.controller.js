(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalUpdateControllerNote', modalUpdateControllerNote);
	
	function modalUpdateControllerNote($scope, $mdDialog, $mdToast, locals,
										editeNoteService, uploadImageNoteService,
										uploadImgNoteUno,uploadImgNoteDos,
										uploadImgNoteTres, deleteImagenNoteService,
										deleteImagenNoteServiceUno,deleteImagenNoteServiceDos,
										deleteImagenNoteServiceTres, uploadImageNoteServiceUno,
										uploadImageNoteServiceDos, uploadImageNoteServiceTres) {

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
				uploadImage:uploadImage,
				uploadImage1:uploadImage1,
				uploadImage2:uploadImage2,
				uploadImage3:uploadImage3,
				deleteImageNote:deleteImageNote,
				deleteImageNote1:deleteImageNote1,
				deleteImageNote2:deleteImageNote2,
				deleteImageNote3:deleteImageNote3,
				text: {
					title: 'Crear boton de pago',
					botonCancelar: 'Cerrar',
					botonConfirmar: 'Confirmar'
				}
			});

			$scope.command = {
                cod:locals.cod,
                titulo:locals.titulo,
                youtube:locals.youtube,
                contenido:locals.contenido,
                dia:locals.dia,
                mes:locals.mes,
                ano:locals.ano,
                idioma:locals.idioma,
                imagen:locals.imagen,
                imagen1:locals.imagen1,
                imagen2:locals.imagen2,
                imagen3:locals.imagen3
            };

            $scope.accion1= 1;
            $scope.accion1= 2;
            $scope.accion1= 3;
            $scope.accion1= 4;


            console.log($scope.command);

            $scope.imagenUrl = localStorage.getItem('imagenUrl');
			console.log($scope.command);
        }

        function uploadImageUno (command){
			uploadImgNoteUno.handle(command, uploadImageNoteSuccess, consultaFail);
        }

        function uploadImageDos (command){
        	uploadImgNoteDos.handle(command, uploadImageNoteSuccess, consultaFail);
        }

        function uploadImageTres (command){
        	uploadImgNoteTres.handle(command, uploadImageNoteSuccess, consultaFail);
        }

		function deleteImageNote (command){
			deleteImagenNoteService.handle(command, deleteImagenNoteSuccess, consultaFail);
        }

        function deleteImageNote1 (command){
			deleteImagenNoteServiceUno.handle(command, deleteImagenNoteSuccess, consultaFail);
        }

        function deleteImageNote2 (command){
			deleteImagenNoteServiceDos.handle(command, deleteImagenNoteSuccess, consultaFail);
        }

        function deleteImageNote3 (command){
			deleteImagenNoteServiceTres.handle(command, deleteImagenNoteSuccess, consultaFail);
        }	


        function uploadImage (command){

        	console.log(command);

        	uploadImageNoteService.handle(command, uploadImageNoteSuccess, consultaFail);
        }

        function uploadImage1 (command){

        	console.log(command);

        	uploadImageNoteServiceUno.handle(command, uploadImageNoteSuccess, consultaFail);
        }

        function uploadImage2 (command){

        	console.log(command);

        	uploadImageNoteServiceDos.handle(command, uploadImageNoteSuccess, consultaFail);
        }

        function uploadImage3 (command){

        	console.log(command);

        	uploadImageNoteServiceTres.handle(command, uploadImageNoteSuccess, consultaFail);
        }	
        
        function uploadImageNoteSuccess(res){
        		var mensaje = res.response.msj;
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);
	            $mdToast.show(toastInstance);
				close();
		}

		
        function deleteImagenNoteSuccess(res){
        		var mensaje = res.response.msj;
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);
	            $mdToast.show(toastInstance);
	            close();
		}


        function onSubmit(command){

        	console.log(command);
        	editeNoteService.handle(command, editNoteSuccess, consultaFail);
        }
        

        function editNoteSuccess(res){
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