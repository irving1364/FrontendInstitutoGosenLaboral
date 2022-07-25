(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.login')
		.controller('LoginController', LoginController);

	function LoginController($scope, $state, $mdToast,
							 loginService) {

		angular.extend($scope, {
			login:login,
			togglePassword:togglePassword
		});

		function init (){
			
			$scope.typePassword = 'password';

			axios.get(localStorage.getItem("apiUrl") + 'auth/getAnio')
			//	axios.get('http://localhost:8081/backendEduMysql/index.php/auth/getAnio')
		//	axios.get('http://okeypanama.institutogosen.edu.pa/backendEduMysql/index.php/auth/getAnio')
		//	axios.get('http://test.institutogosen.edu.pa/backendEduMysql/index.php/auth/getAnio')
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

		function togglePassword(type) {
	        $scope.typePassword = type;
			
		}

		function login(command) {
	        loginService.handle(command, loginSuccess, loginFailed);
		}

		function loginSuccess(response) {
	    	localStorage.setItem('token', response.response.token);
	    	localStorage.setItem('nombre', response.response.nombre);
	    	localStorage.setItem('cod_rol', response.response.cod_rol);
	    	localStorage.setItem('anio', response.response.anioSelect[0].anio);
	    	localStorage.setItem('cod_anio', $scope.command.cod_anio);
			


			if($scope.command.pass === $scope.command.email){
				$state.go('app.reset', {
					pass: $scope.command.pass,
					user: $scope.command.email
				});
			}else{
				if(response.response.cod_rol === '4'){
					$state.go('app.dashboard').then(mostrarMensajeDeBienvenida);
				}
	
				if(response.response.cod_rol === '3'){
					$state.go('app.calendario').then(mostrarMensajeDeBienvenida);
				}
	
				if(response.response.cod_rol === '2'){
								
					$state.go('app.evaluaciones').then(mostrarMensajeDeBienvenida);
				}
	
				if(response.response.cod_rol === '1'){
					$state.go('app.asignacion').then(mostrarMensajeDeBienvenida);
				}
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


        init();
	}

})();