(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalEditarEvaGradoController', modalEditarEvaGradoController);
	
	function modalEditarEvaGradoController($scope, $mdDialog, $mdToast, locals,
											editarEvaluacionService) {

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
		
			console.log(locals.evalua);
			$scope.command = {};
			$scope.command = locals.evalua;
			$scope.command.cod_tipo_evaluacion = parseInt($scope.command.cod_tipo_evaluacion);
			
			
			var date = new Date();
			console.log(date);
			date.setDate(date.getDate() + -7);
			console.log(date);
			$scope.command.fechas = new Date($scope.command.fecha);
			$scope.command.fechas.setDate($scope.command.fechas.getDate() + 1);
			console.log($scope.command.fechas);
			
			if (date > $scope.command.fechas) {
				mensajeToast('No se puede editar esta evaluacion porque la fecha es menor a la actual.');
				close();
			}

		}
	
        function onSubmit(command){

			var date = new Date();
			var valido1 = false;
			var valido2 = false;
			date.setDate(date.getDate() + -7);
			console.log(date);

			if (date < command.fechas) {
				valido1 = true;
			}else {
				mensajeToast('La fecha no puede superar los 7 dias de antiguedad');
			}

			if (command.hora_inii < command.hora_fiin) {
				valido2 = true;
			}else {
				mensajeToast('La hora de inicio no puede ser menor a la hora de finalización');
			}

			if(valido1 && valido2){
				var day = command.fechas.getDate();
				var month = command.fechas.getMonth();
				var year = command.fechas.getFullYear();
				command.fecha2 = year + '/' + month + '/' + day; 
				command.hora_ini2 = moment(command.hora_inii,['DDMMMMY HH:mm:ss', 'MMMMDDY HH:mm:ss']).add(24, 'hours').format('HH:mm');
				command.hora_fin2 = moment(command.hora_fiin,['DDMMMMY HH:mm:ss', 'MMMMDDY HH:mm:ss']).add(24, 'hours').format('HH:mm');
				console.log(command);
				editarEvaluacionService.handle(command, maestroSuccess, peticionFailed);
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