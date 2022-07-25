(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes', [])
		.config(gestionOrdenes);

	function gestionOrdenes($stateProvider) {

		$stateProvider.state('app.gestionOrdenes', {
			url:'/gestion-ordenes',
			abstract: true,
			views  : {
				'toolbar@app': {
					template: '<toolbar-market-nz></toolbar-market-nz>'
				},
	            'content@app': {
	                templateUrl: 'app/coinex-app/use-cases/gestion-ordenes/gestion-ordenes.html',
	                controller : 'gestionOrdenesController'
	            }
	        },
		});

		$stateProvider.state('app.gestionOrdenes.comprar', {
			url:'/comprar',
			views  : {
	            'comprar@app.gestionOrdenes': {
	                templateUrl: 'app/coinex-app/use-cases/gestion-ordenes/widgets/comprar/comprar.html',
	                controller : 'comprarController'
	            }
	        },
		});

		$stateProvider.state('app.gestionOrdenes.vender', {
			url:'/vender',
			views  : {
	            'vender@app.gestionOrdenes': {
	                templateUrl: 'app/coinex-app/use-cases/gestion-ordenes/widgets/vender/vender.html',
	                controller : 'venderController'
	            }
	        },
		});

		$stateProvider.state('app.gestionOrdenes.historicoOrdenes', {
			url:'/historico-ordenes',
			views  : {
	            'historicoOrdenes@app.gestionOrdenes': {
	                templateUrl: 'app/coinex-app/use-cases/gestion-ordenes/widgets/historico-ordenes/historico-ordenes.html',
	                controller : 'historicoOrdenes'
	            }
	        },
		});


	}

})();