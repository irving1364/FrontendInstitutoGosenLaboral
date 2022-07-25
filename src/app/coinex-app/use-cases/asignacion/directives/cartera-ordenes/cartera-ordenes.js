(function() {
	
	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.directive('carteraOrdenes', carteraOrdenes);

	function carteraOrdenes() {

		return {
			scope: {
				dates:"=",
				marketSelect:"="
			},
			controller: function($scope) {

			},	
	        templateUrl: 'app/coinex-app/use-cases/dashboard/directives/cartera-ordenes/cartera-ordenes.html',
	            
        }

	}

})();