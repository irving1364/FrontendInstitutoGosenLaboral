(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('loginService', loginService);

	function loginService($coinexHttp, $q, newAddressResponseFake) {
		
		window.app.env('TEST', function() {
			$coinexHttp = new window.app.ServerFake($q);
			$coinexHttp.setResolve(newAddressResponseFake.ok);
		});

		var handler = new loginHandler($coinexHttp, $q);
		return {
			handle: handler.handle.bind(handler)
		}

	}

	function loginHandler($coinexHttp, $q, $http) {
		this.coinexHttp = $coinexHttp;
		this.q = $q;
		this.http = $http;
	}

	loginHandler.prototype = {
		handle: function(command, success, failed) {
			this.action(command)
			.then(
				this.handleSuccess.bind(this),
				this.handleFailed.bind(this)
			)
			.then(success, failed);


		},
		action: function(command, success, failed) {
			console.log(command);
			var data = {	
				user:command.email,
				pass:command.pass,
				cod_rol:command.cod_rol,
				cod_anio:command.cod_anio
			};
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") + 'auth/login', data);
		//	return this.coinexHttp.http.post('http://okeypanama.institutogosen.edu.pa/backendEduMysql/index.php/auth/login', data);
		//	return this.coinexHttp.http.post('http://test.institutogosen.edu.pa/backendEduMysql/index.php/auth/login', data);
		//	return this.coinexHttp.http.post('http://localhost:8081/backendEduMysql/index.php/auth/login', data);
		},
		
		handleSuccess: function(response) {
			console.log(response.data);
			if(response.data.code == 200) {
				return this.q.resolve(response.data);
			}
			else {
				return this.q.reject({
					mensaje: 'Hubo un error al traer la direccion'
				});
			}
		},
		handleFailed: function(response) {
			return this.q.reject(response);
		}
	} 	

})();