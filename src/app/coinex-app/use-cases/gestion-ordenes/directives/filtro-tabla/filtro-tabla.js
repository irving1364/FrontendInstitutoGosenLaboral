(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.directive('filtroTabla', filtroTabla);

	function filtroTabla() {

		var templateUrl = 'app/coinex-app/use-cases/gestion-ordenes/'
			.concat('directives/filtro-tabla/filtro-tabla.html');

		return {
			scope: {
				filtrar: '&'
			},
			controller: function($scope) {
				angular.extend($scope, {
					command: {
						abiertas:'',
						ejecutadas:'',
						canceladas:'',
						pausadas:'',
						compra:'',
						venta:'',
						desde:'',
						hasta:'',
						cantidadRegistro:'',
					},
					buscar: buscar
				});

				function buscar() {
					//console.log($scope.command);
					$scope.filtrar({command: $scope.command});
				}
			},
			templateUrl: templateUrl
		}
	}


})();
