(function() {


	'use strict';

	angular
		.module('coinex-app.directives')
		.controller('Toolbar', Toolbar);


	function Toolbar($scope, Session, $state, $rootScope ) {
		angular.extend($scope, {
            expireSession: expireSession         
        });	
		
		
		function expireSession() {
		 	Session.expireSession().then(function(){
		 		$state.go('app.login');
		 	})
		}

		


	}

})();