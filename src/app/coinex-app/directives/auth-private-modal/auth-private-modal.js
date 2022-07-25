(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('authPrivateModal', authPrivateModal)
		.controller('authPrivateModalController', authPrivateModalController);


	function authPrivateModal($mdDialog) {

		return function(attrs) {
			

			$mdDialog.show({
          		locals: attrs.locals,
        		controller: 'authPrivateModalController',
        		templateUrl: [
        			'app/coinex-app/directives/',
        			'auth-private-modal/auth-private-modal.html'
    			].join(''),
        		parent: angular.element(document.body),
        		targetEvent: attrs.ev,
        		clickOutsideToClose:true,
        		fullscreen: true
      		})
        
      		.then(attrs.close, attrs.hide);

		}
	}

	function authPrivateModalController($scope, $mdDialog) {

		function init() {
			$scope.command = {};
			$scope.url 	= '';	

		    angular.extend($scope, {
		        hide: hide,
		        close: close
		    });   
	    }



	    function hide() {
	      $mdDialog.hide();
	    }

	    function close() {
	      $mdDialog.cancel();
	    }
	    

	  


    	init();

	}


})();