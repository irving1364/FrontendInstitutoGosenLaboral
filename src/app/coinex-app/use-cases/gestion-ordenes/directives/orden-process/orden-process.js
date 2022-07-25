(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.directive('ordenProcess', ordenProcess);


	function ordenProcess() {
		var templateUrl = [
			'app/coinex-app/use-cases/gestion-ordenes/',
			'directives/orden-process/',
			'orden-process.html'

		].join('');
		return {
			templateUrl: templateUrl
		}
	}


})();