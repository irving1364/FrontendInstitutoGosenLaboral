(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.recuperacion')
		.controller('recuperacionController', recuperacionController);

	function recuperacionController($scope, $state, $mdToast, $translate,
							 $stateParams, recuperarPassService) {

		angular.extend($scope, {
			onSubmit:onSubmit
		});

		function init (){
			console.log($stateParams);
			$scope.command = {};
			$scope.command.pass = $stateParams.pass;
			$scope.command.user = $stateParams.user;
		
			//axios.get('http://localhost:8081/backendEduMysql/index.php/auth/getAnio')
			axios.get('http://okeypanama.institutogosen.edu.pa/backendEduMysql/index.php/auth/getAnio')
			.then(function (response) {
				// handle success
				console.log(response.data.anio);
				$scope.anio = response.data.anio;

			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
		}

		function onSubmit(command) {
			recuperarPassService.handle(command, recuSuccess, loginFailed);
		}

		function recuSuccess(response) {
			console.log(response);
			$state.go('app.login').then(mostrarMensajeDeBienvenida);
	    }		

	    function loginFailed(response) {
	             
	            var mensaje = 'Ocurrio un error al intentar ingresar';
	            var toastInstance = $mdToast.simple()
	                  .textContent(mensaje)
	                  .position('top-right')
	                  .hideDelay(6000);

	            $mdToast.show(toastInstance);
	    }

		
        function mostrarMensajeDeBienvenida(response) {

	        var toastInstance, mensaje;

	        mensaje = 'Revise su bandeja de entrada e ingrese.';
	        
	        toastInstance = $mdToast.simple()
	            .textContent(mensaje)
	            .position('bottom right')
	            .hideDelay(3000)

	        $mdToast.show(toastInstance);
	    }

		function mensaje(msj) { 

			var toastInstance;

	        toastInstance = $mdToast.simple()
	            .textContent(msj)
	            .position('bottom right')
	            .hideDelay(3000)

	        $mdToast.show(toastInstance);
	    }


        init();
	}

})();