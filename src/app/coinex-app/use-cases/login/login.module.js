(function() {

	'use strict';


	angular
		.module('coinex-app.use-cases.login', [])
		.config(login);

	function login($stateProvider) {

		$stateProvider.state('app.login', {
			url: '/login',
            views    : {
                'main@' : {
                    templateUrl: 'app/core/layouts/content-with-toolbar.html',
                    controller : 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/coinex-app/use-cases/login/login.html',
                    controller : 'LoginController'
                }
            }
        });

	}

})();