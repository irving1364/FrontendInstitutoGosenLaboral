(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.maestros')
		.controller('modalComentarioController', modalComentarioController);
	
	function modalComentarioController($scope, $mdDialog, $mdToast, locals) {

		function close() {
			$mdDialog.hide('close');
		}

		function cancel() {
			$mdDialog.cancel('cancel');
		}

		function init (){
			angular.extend($scope, {
				close: close,
				cancel: cancel
			});

			console.log(locals);
			$scope.command = locals.maestros;
        }
	
		init();
	}

})();