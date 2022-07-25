(function() {


	'use strict';

	angular
		.module('app.sample')
		.service('balanceService', balanceService);

		function balanceService( $http, $q) {
			



			this.balanceAll = function (currencies, callback, errorHandler) {
				 $http.get('app/main/sample/services/balance.json', {
            	 }).then(callback, errorHandler)
			};

		}	

	})();