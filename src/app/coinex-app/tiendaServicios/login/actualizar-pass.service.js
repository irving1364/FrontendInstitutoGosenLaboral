(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('actualizarPassService', actualizarPassService);

	function actualizarPassService($coinexHttp, $q, newAddressResponseFake) {
		
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
				token		:localStorage.getItem('token'),
				passActual  :command.pass,
				passNueva	:command.passNueva,
				passNueva2	:command.passNueva2
			};

			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'auth/updatePass', data);
		},
		
		handleSuccess: function(response) {
			console.log(response.data);
			if(response.data.code == 200) {
				return this.q.resolve(response.data);
			}
			else {
				return this.q.reject({
					mensaje: response.data.response
				});
			}
		},
		handleFailed: function(response) {
			return this.q.reject(response);
		}
	} 	

})();