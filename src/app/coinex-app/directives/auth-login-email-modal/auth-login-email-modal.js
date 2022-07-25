(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('authLoginEmailModal', authLoginEmailModal)
		.controller('authLoginEmailModalController', authLoginEmailModalController);


	function authLoginEmailModal($mdDialog) {

		return function(attrs) {
			

			$mdDialog.show({
          		locals: attrs.locals,
        		controller: 'authLoginEmailModalController',
        		templateUrl: [
        			'app/coinex-app/directives/',
        			'auth-login-email-modal/auth-login-email-modal.html'
    			].join(''),
        		parent: angular.element(document.body),
        		targetEvent: attrs.ev,
        		clickOutsideToClose:true,
        		fullscreen: true
      		})
        
      		.then(attrs.close, attrs.hide);

		}
	}

	function authLoginEmailModalController($scope, $mdDialog, authEmailDinamicService,
										   data, $state, authenticateService) {

		function init() {
			$scope.command = {};
			$scope.url 	= '';	
			$scope.command 	= data.config.data;
			$scope.url 		= data.config.url;	

		    angular.extend($scope, {
		        hide: hide,
		        submit: submit,
		        close: close
		    });   
	    }

	    function submit(command) {
	    	if ($scope.url == 'http://test.coinex.la/gateway/public/authenticate') {			
				authenticateService.authenticate(
					$scope.command, 
					authEmailSuccess,
					authEmailFail
				);
			}
	    	if ($scope.url != 'http://test.coinex.la/gateway/public/authenticate') {			
				authEmailDinamicService.handle(
					$scope.command, 
					$scope.url,
					authEmailSuccess,
					authEmailFail
				);
			}
		};
		
		function authEmailSuccess(response) {		
			console.log(response);
			if ($scope.url == 'http://test.coinex.la/gateway/public/authenticate') {			
					if (response.missing_authenticators == '') {
						$state.go('app.dashboard');
					}
			}
			$mdDialog.hide();	
				
		}

		function authEmailFail(response) {
				console.log(response);
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