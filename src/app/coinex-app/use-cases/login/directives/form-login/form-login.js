(function() {
	
	'use strict';

	angular
		.module('coinex-app.use-cases.login')
		.directive('formLogin', formLogin);

	function formLogin() {

		return {

			scope: {
				onSubmit: '&'
			},

			controller: function($scope, confirmModal) {

				angular.extend($scope, {
					command: {
						user: '',
						pass: ''
					},
					submit: submit,
					modalRegistro: modalRegistro
				});

				function submit() {
					console.log($scope.command);
					$scope.onSubmit({command: $scope.command});
				}

				function modalRegistro(ev) {
            
		            var templateUrl = [
		                'app/coinex-app/use-cases/login/',
		                'directives/modal-registro/modal-registro.html'
		            ].join('');
		            confirmModal({
		                templateUrl: templateUrl,
		                locals: {
		                },
		                controller: 'modalRegistroController',
		                close: function(e) {
		                    //getAllNotes();
		                },
		                cancel: function(e) {
		                    console.log('cancel', e);
		                },
		                targetEvent: ev,
		            });
		        };

			},	
	        templateUrl: 'app/coinex-app/use-cases/login/directives/form-login/form-login.html',
	            
        }

	}

})();