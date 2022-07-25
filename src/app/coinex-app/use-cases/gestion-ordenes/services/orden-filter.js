(function() {


	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.factory('ordenFilter', ordenFilter);

	function ordenFilter() {
	    return function($mdBottomSheet, command) {
	        $mdBottomSheet.show({
	          templateUrl: command.templateUrl,
	          controller: command.controller,
	          targetEvent: command.ev,
	        })
	        .then(command.open)
	        .catch(command.close);
	    }
	}	


})();