(function() {

	'use strict';


	angular
		.module('coinex-app.use-cases.recuperacion', [])
		.config(recuperacion);

	function recuperacion($stateProvider) {

		$stateProvider.state('app.recuperacion', {
			url: '/recuperacion',
            params: {
                pass: null,
                user: null
            },
            views    : {
                'main@' : {
                    templateUrl: 'app/core/layouts/content-with-toolbar.html',
                    controller : 'MainController as vm'
                },
                'content@app.recuperacion': {
                    templateUrl: 'app/coinex-app/use-cases/recuperacion/recuperacion.html',
                    controller : 'recuperacionController'
                }
            }
        });

	}

})();