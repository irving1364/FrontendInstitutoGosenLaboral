(function() {


	'use strict';

	angular
		.module('app.sample')
		.service('NewAddresService', NewAddresService);

		function NewAddresService( $http, $q) {
			
			this.newAddress = function (command, callback, errorHandler) {
				 console.log(command);
				 $http.post('http://showcase.draglet.com/gateway/private/newAddress', {
				 	 currency:command.currency,
            	 }).then(callback, errorHandler)
			};

		}	

	})();