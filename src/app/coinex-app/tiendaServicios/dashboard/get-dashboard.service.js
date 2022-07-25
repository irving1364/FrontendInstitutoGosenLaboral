(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('getDashboardService', getDashboardService);

	function getDashboardService($coinexHttp, $q, newAddressResponseFake) {
		
		window.app.env('TEST', function() {
			$coinexHttp = new window.app.ServerFake($q);
			$coinexHttp.setResolve(newAddressResponseFake.ok);
		});

		var handler = new Handle($coinexHttp, $q);
		return {
			handle: handler.handle.bind(handler)
		}

	}

	function Handle($coinexHttp, $q, $http) {
		this.coinexHttp = $coinexHttp;
		this.q = $q;
		this.http = $http;
	}

	Handle.prototype = {
		handle: function( success, failed) {
			this.action()
			.then(
				this.handleSuccess.bind(this),
				this.handleFailed.bind(this)
			)
			.then(success, failed);
		},
		action: function(success, failed) {
			var data = {	
				token: localStorage.getItem('tokens'),
				cod_anio: localStorage.getItem('cod_anio'),
			};
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'tabla/getDashboard', data);
		},
		handleSuccess: function(response) {
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