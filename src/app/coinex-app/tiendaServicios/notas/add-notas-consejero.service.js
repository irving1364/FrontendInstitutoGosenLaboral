(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('addNotasConsejeroService', addNotasConsejeroService);

	function addNotasConsejeroService($coinexHttp, $q, newAddressResponseFake) {
		
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
		handle: function(command, datos, success, failed) {
			this.action(command, datos)
			.then(
				this.handleSuccess.bind(this),
				this.handleFailed.bind(this)
			)
			.then(success, failed);
		},
		action: function(command, datos, success, failed) {
			console.log(command);
			var data = {	
				token:	   			localStorage.getItem('token'),				
				cod_anio:        	localStorage.getItem('cod_anio'),
				cod_curso_detail:   datos.cod_curso_detail,
				cod_estudiante:     datos.cod_estudiante,
				trimestre: 			datos.trimestre,
				responsabilidad:   	command.responsabilidad,
				honradez:  			command.honradez,
				organizacion: 		command.organizacion,
				autodom:   		    command.autodom,
				iniciativa:  		command.iniciativa,
				cooperacion: 		command.cooperacion,
				respeto:   		    command.respeto,
				modales:  		    command.modales,
                conducta:  		    command.conducta,
				orden: 			    command.orden,
				tiempo:   		    command.tiempo,
				conciencia:  		command.conciencia,
				observacion:  		command.observacion
			};
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'Notas/addActitudes', data);
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