(function() {
	
	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('carteraMap', carteraMap);

	function carteraMap(walletsExtend) {
		return function(balances) {
			return balances.map(function(balance) {
				var walletFind = _.find(walletsExtend, {
					currency: balance.currency
				});

				return _.assign(balance, walletFind);
			});
		}
	}



})();