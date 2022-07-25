(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('getEvaluaMaestroTrimestreService', getEvaluaMaestroTrimestreService);

	function getEvaluaMaestroTrimestreService($coinexHttp, $q, newAddressResponseFake) {
		
		window.app.env('TEST', function() {
			$coinexHttp = new window.app.ServerFake($q);
			$coinexHttp.setResolve(newAddressResponseFake.ok);
		});

		var handler = new Handlers($coinexHttp, $q);
		return {
			handle: handler.handle.bind(handler)
		}
	}
	function Handlers($coinexHttp, $q, $http) {
		this.coinexHttp = $coinexHttp;
		this.q = $q;
		this.http = $http;
	}
	Handlers.prototype = {
		handle: function(trimestre, success, failed) {
			this.action(trimestre)
			.then(
				this.handleSuccess.bind(this),
				this.handleFailed.bind(this)
			)
			.then(success, failed);
		},
		action: function(trimestre, success, failed) {
            var data = {	
				token:	   			localStorage.getItem('token'),				
				cod_anio:        	localStorage.getItem('cod_anio'),				
				trimestre:        	trimestre
			};
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'Evaluacion/getEvaluacionMaestroTrimestre', data);
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