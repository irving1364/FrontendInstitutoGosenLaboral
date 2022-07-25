(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalAddEvaGradoController', modalAddEvaGradoController);
	
	function modalAddEvaGradoController($scope, $mdDialog, $mdToast, locals,
										addEvaluacionService) {

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
		
			console.log(locals);

			$scope.command = {
                cod_curso_materia:		locals.cod_curso_materia.cod,
				fecha: 					new Date()
			};

			var data = {	
				token:			  	   localStorage.getItem('token'),
				cod_anio:			   localStorage.getItem('cod_anio')
			}; 		
			
			axios.post(localStorage.getItem("apiUrl") +'Notas/getNotasEstu',data)
			.then(function (response) {
			  // handle success
			  console.log(response);
			})
			.catch(function (error) {
			  peticionFailed();
			})
		
		}
	
        function onSubmit(command){
			console.log(command);
			var date = new Date();
			var valido1 = false;
			var valido2 = false;
			date.setDate(date.getDate() + -7);
			console.log(date);

			if (date < command.fecha) {
				valido1 = true;
			}else {
				mensajeToast('La fecha no puede superar los 7 dias de antiguedad');
			}

			if (command.hora_ini < command.hora_fin) {
				valido2 = true;
			}else {
				mensajeToast('La hora de inicio no puede ser menor a la hora de finalización');
			}

			if(valido1 && valido2){
				var day = command.fecha.getDate();
				var month = command.fecha.getMonth();
				var year = command.fecha.getFullYear();
				command.fecha2 = year + '/' + month + '/' + day; 
				command.hora_ini2 = moment(command.hora_ini,['DDMMMMY HH:mm:ss', 'MMMMDDY HH:mm:ss']).add(24, 'hours').format('HH:mm');
				command.hora_fin2 = moment(command.hora_fin,['DDMMMMY HH:mm:ss', 'MMMMDDY HH:mm:ss']).add(24, 'hours').format('HH:mm');
				addEvaluacionService.handle(command, maestroSuccess, peticionFailed);
			}
			
			
        }
    
		function maestroSuccess(){
			close();
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

		init();
	}

})();