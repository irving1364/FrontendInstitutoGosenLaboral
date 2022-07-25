(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('resetPassService', resetPassService);

	function resetPassService($coinexHttp, $q, newAddressResponseFake) {
		
		window.app.env('TEST', function() {
			$coinexHttp = new window.app.ServerFake($q);
			$coinexHttp.setResolve(newAddressResponseFake.ok);
		});

		var handler = new registroHandler($coinexHttp, $q);
		return {
			handle: handler.handle.bind(handler)
		}

	}

	function registroHandler($coinexHttp, $q, $http) {
		this.coinexHttp = $coinexHttp;
		this.q = $q;
		this.http = $http;
	}

	registroHandler.prototype = {
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
				user    :command.user,
				pass	:command.password2
			};
		
			//return this.coinexHttp.http.post('https://integralseguros.com.pa/driveBack/index.php/auth/registro', data);
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'auth/resetPassword', data);
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