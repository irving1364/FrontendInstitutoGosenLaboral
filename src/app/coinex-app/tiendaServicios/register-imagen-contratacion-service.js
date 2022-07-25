(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('registerImagenContratacionService', registerImagenContratacionService);

	function registerImagenContratacionService($coinexHttp, $q, newAddressResponseFake) {
		
		window.app.env('TEST', function() {
			$coinexHttp = new window.app.ServerFake($q);
			$coinexHttp.setResolve(newAddressResponseFake.ok);
		});

		var handler = new registerImagenContratacionHandler($coinexHttp, $q);
		return {
			handle: handler.handle.bind(handler)
		}

	}


	function registerImagenContratacionHandler($coinexHttp, $q, $http) {
		this.coinexHttp = $coinexHttp;
		this.q = $q;
		this.http = $http;
	}

	registerImagenContratacionHandler.prototype = {
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
			

			var formData = new FormData();
			formData.append("imagen",command.imagen);
			formData.append("codCategoria",command.codCategoria);
			console.log(formData);
		
			//return this.coinexHttp.http.post('https://farma-irving1364.c9users.io/backfarma/index.php/auth/login', data);
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'contratacion/registerImagen2', formData, {
				headers:{
					"Content-type": undefined
				},
				transformRequest:angular.identity
			});
		},
		handleSuccess: function(response) {
			console.log(response.data);
			if(response.data.code == 200) {
				return this.q.resolve(response.data);
			}
			else {
				return this.q.reject({
					mensaje: 'Recuerde que solo puede tener una imagen de fondo, eliminela y para subir otra'
				});
			}
		},
		handleFailed: function(response) {
			return this.q.reject(response);
		}
	} 	

})();