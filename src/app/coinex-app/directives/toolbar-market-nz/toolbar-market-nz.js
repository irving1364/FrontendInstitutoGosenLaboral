(function() {

	'use strict';

	angular
		.module('coinex-app.directives')
		.directive('toolbarMarketNz', toolbarMarketNz);

	function toolbarMarketNz() {

		var templateUrl = [
			'app/coinex-app/directives/',
			'toolbar-market-nz/toolbar-market-nz.html'
		].join('');

		return {
			controller: function($scope, $rootScope,$mdSidenav) {

				function init() {
					angular.extend($scope, {
			            toggleSidenav: toggleSidenav
			        });

					subscribeChangeMarket();
					subscribeCleanMarket();
					$scope.show = false;
				
				}

				function subscribeChangeMarket() {
					$rootScope.$on('market:change', function(e, data) {
						$scope.show = true;
					    $scope.market = data.market;
					});
				}	

				function subscribeCleanMarket() {
					$rootScope.$on('market:reset', function(e, data) {
						$scope.show = false;
					});
				}
				function toggleSidenav(sidenavId)
		        {
		            $mdSidenav(sidenavId).toggle();
		        }

				init();

			},
			templateUrl: templateUrl
		}
	}

})();
