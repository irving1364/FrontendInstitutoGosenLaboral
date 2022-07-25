(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('addNotasService', addNotasService);

	function addNotasService($coinexHttp, $q, newAddressResponseFake) {
		
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
		handle: function(command, success, failed) {
			this.action(command)
			.then(
				this.handleSuccess.bind(this),
				this.handleFailed.bind(this)
			)
			.then(success, failed);
		},
		action: function(command, success, failed) {
			var data = {	
				token:	   			localStorage.getItem('token'),				
				cod_anio:        	localStorage.getItem('cod_anio'),
				cod_estudiante:     command.cod_estudiante,
				cod_curso_materia:  command.cod_curso_materia,
				nota1: 			  	command.nota1,
				nota2:   			command.nota2,
				nota3:  			command.nota3,
				ausencia1: 			command.ausencia1,
				ausencia2:   		command.ausencia2,
				ausencia3:  		command.ausencia3,
				tardanza1: 			command.tardanza1,
				tardanza2:   		command.tardanza2,
				tardanza3:  		command.tardanza3
			};
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'Notas/addNotas', data);
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