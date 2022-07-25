(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.evaluacionesEstu')
		.controller('modalVerAusenciaTardanzaController', modalVerAusenciaTardanzaController);
	
	function modalVerAusenciaTardanzaController($scope, $mdDialog, $mdToast, locals) {

		function close() {
			console.log();
			$mdDialog.hide();
		}


		function cancel() {
			$mdDialog.cancel('cancel');
		}

		function init (){
			angular.extend($scope, {
				close: close,
				cancel: cancel
			});
			
			$scope.command = locals.eva;
		}
		
		init();
	}

})();