(function() {
	
	'use strict';

	angular
		.module('coinex-app.directives')
		.directive('wallet', wallet);

	function wallet() {

		var templateUrl = [
			'app/coinex-app/',
			'directives/wallet/wallet.html'
		].join('');

		return {
			scope: {
				walletInput: '=',
				walletSelectExpresion: '=',
				onSelected: '&'
			},
			controller: function($scope, walletsExtend) {
				
				angular.extend($scope, {
					wallet: walletExtend(),
					selected: selected
				});

				function walletExtend() {
					var walletFind = _.find(walletsExtend, {
						currency: $scope.walletInput.currency
					});
				    return _.assign($scope.walletInput, walletFind);
				}

				function selected() {
					$scope.onSelected({wallet: $scope.wallet});
				}
			},
			templateUrl: templateUrl
		}
	}

})();