(function() {
	
	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.directive('completeCuenta', completeCuenta);

	function completeCuenta() {
		return {
			scope: {
				trades:"="
			},
			controller: function($scope,agregarBancoModal,listarBancoModal) {
				
				angular.extend($scope, {
				           openAgregarBancoModal: openAgregarBancoModal,
				           openListarBancoModal:openListarBancoModal
				        });

				function openAgregarBancoModal(ev) {
						agregarBancoModal({
							ev: ev,
							locals: {},
							close: function() {},
							hide: function() {}
						});
					}

				function openListarBancoModal(ev) {
						listarBancoModal({
							ev: ev,
							locals: {},
							close: function() {},
							hide: function() {}
						});
					}	


					

			},	
	        templateUrl: 'app/coinex-app/use-cases/dashboard/directives/complete-cuenta/complete-cuenta.html',
        }
	}

})();