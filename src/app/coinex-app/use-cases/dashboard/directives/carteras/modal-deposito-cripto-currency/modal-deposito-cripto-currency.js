(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('modalDepositoCriptoCurrency', modalDepositoCriptoCurrency)
		.controller('modalDepositoCriptoCurrencyController', modalDepositoCriptoCurrencyController);


	function modalDepositoCriptoCurrency($mdDialog) {

		return function(attrs) {

			$mdDialog.show({
          locals: {
          	balance: attrs.locals.balance
          },
        	controller: 'modalDepositoCriptoCurrencyController',
        	templateUrl: [
        		'app/coinex-app/use-cases/dashboard/',
        		'directives/carteras/modal-deposito-cripto-currency/',
        		'modal-deposito-cripto-currency.html'
    		].join(''),
        	parent: angular.element(document.body),
        	targetEvent: attrs.ev,
        	clickOutsideToClose:true,
        	fullscreen: true
      })
        
      .then(attrs.close, attrs.hide);
		};


	}

	function modalDepositoCriptoCurrencyController($scope, $mdDialog, balance, retiroCriptoWallet) {
    

		function init() {
      angular.extend($scope, {
        balance:balance,
        hide: hide,
        close: close
      });
      console.log($scope);
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