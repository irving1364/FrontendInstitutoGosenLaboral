(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.reset')
		.controller('resetController', resetController);

	function resetController($scope, $state, $mdToast, $translate,
							 $stateParams, resetPassService) {

		angular.extend($scope, {
			onSubmit:onSubmit,
			togglePassword:togglePassword
		});

		function init (){

			$scope.typePassword = 'password';

			console.log($stateParams);
			$scope.command = {};
			$scope.command.pass = $stateParams.pass;
			$scope.command.user = $stateParams.user;
			
			$scope.command.cod_rol = localStorage.getItem("cod_rol");
			
			if($scope.command.user == null || $scope.command.pass == null){
				$state.go('app.login').then();	
			}
		}

		function togglePassword(type) {
	        $scope.typePassword = type;
		}

		function onSubmit(command) {
			if($scope.command.user == command.password1){
				mensaje('Las contraseñas no puede ser igual al usuario');
			}else{
				if(command.password1 == command.password2){
					resetPassService.handle(command, loginSuccess, loginFailed);
				}else{
					mensaje('Las contraseñas no coinciden');
				}
			}
			
			
		}

		function loginSuccess(response) {
			console.log(response);
	    	
			if($scope.command.cod_rol === '4'){
				$state.go('app.dashboard').then(mostrarMensajeDeBienvenida);
			}

			if($scope.command.cod_rol === '3'){
				$state.go('app.misNotas').then(mostrarMensajeDeBienvenida);
			}

			if($scope.command.cod_rol === '2'){
							
				$state.go('app.notas').then(mostrarMensajeDeBienvenida);
			}

			if($scope.command.cod_rol === '1'){
				$state.go('app.asignacion').then(mostrarMensajeDeBienvenida);
			}
			
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

	        mensaje = 'Bienvenido';
	        
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