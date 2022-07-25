(function() {
	
	'use strict';

	angular
		.module('coinex-app.directives')
		.directive('walletTotal', walletTotal);

	function walletTotal() {
		var templateUrl = 'app/coinex-app/directives/wallet-total/wallet-total.html';
		return {
			scope: {
				walletSelected: '='
			},
			controller: function($scope) {

			},
			templateUrl: templateUrl
		}
	}



})();