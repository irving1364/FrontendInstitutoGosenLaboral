(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.factory('confirmModal', confirmModal);

	function confirmModal($mdDialog) {
		return function(command) {
			$mdDialog.show({
				locals: command.locals,
	      		controller: command.controller,
		      	templateUrl: command.templateUrl,
		      	parent: angular.element(document.body),
		      	targetEvent: command.ev,
		      	clickOutsideToClose:true,
		      	fullscreen: true
		    })
		    .then(command.close, command.cancel);
		}
	}


})();