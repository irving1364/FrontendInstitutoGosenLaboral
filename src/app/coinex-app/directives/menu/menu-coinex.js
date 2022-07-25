(function(){

	'use-strict'

	angular
		.module('coinex-app.directives')
		.directive('menuCoinex',menuCoinex);

		function menuCoinex(){
			
			var templateUrl = [
				'app/coinex-app/',
				'directives/menu/menu-coinex.html'
				].join('');

			return {
				templateUrl : templateUrl,
				controller: function($scope, $state){

					angular.extend($scope, {
			        });

			        $scope.cod_rol = localStorage.getItem('cod_rol');
					$scope.nombre = localStorage.getItem('nombre');
					
				}

			}

		}

})();