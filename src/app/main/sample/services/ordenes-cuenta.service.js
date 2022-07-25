(function() {


	'use strict';

	angular
		.module('app.sample')
		.service('OrdenerCuentaService', OrdenerCuentaService);

		function OrdenerCuentaService( $http, $q) {
			
			this.bestOfferAll = function ( callback, errorHandler) {
				 $http.post('http://showcase.draglet.com/gateway/public/bestOffer', {
				 	count:9,
				 	market:"BTC-USD"
            	 }).then(callback, errorHandler)
			};

			this.lastTradesAll = function ( callback, errorHandler) {
				 $http.post('http://showcase.draglet.com/gateway/public/lastTrades', {
				 	count:9,
				 	market:"BTC-USD"
            	 }).then(callback, errorHandler)
			};
		}	

	})();