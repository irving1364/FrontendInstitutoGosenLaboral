(function() {

	'use strict';


	angular
		.module('coinex-app.use-cases.reset', [])
		.config(reset);

	function reset($stateProvider) {

		$stateProvider.state('app.reset', {
			url: '/reset',
            params: {
                pass: null,
                user: null
            },
            views    : {
                'main@' : {
                    templateUrl: 'app/core/layouts/content-with-toolbar.html',
                    controller : 'MainController as vm'
                },
                'content@app.reset': {
                    templateUrl: 'app/coinex-app/use-cases/reset/reset.html',
                    controller : 'resetController'
                }
            }
        });

	}

})();