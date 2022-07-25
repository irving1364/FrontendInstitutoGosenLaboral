(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('modalDepositoFiatCurrency', modalDepositoFiatCurrency)
		.controller('modalDepositoFiatCurrencyController', modalDepositoFiatCurrencyController);


	function modalDepositoFiatCurrency($mdDialog) {
		  return function(attrs) {
			   $mdDialog.show({
            locals: {
          	 balance: attrs.locals.balance
            },
        	  controller: 'modalDepositoFiatCurrencyController',
        	  templateUrl: [
        		    'app/coinex-app/use-cases/dashboard/',
        		    'directives/carteras/modal-deposito-fiat-currency/',
        		    'modal-deposito-fiat-currency.html'
    		    ].join(''),
        	  parent: angular.element(document.body),
        	  targetEvent: attrs.ev,
        	  clickOutsideToClose:true,
        	  fullscreen: true
          })
        
        .then(attrs.close, attrs.hide);
		};

	}

	function modalDepositoFiatCurrencyController($scope, $mdDialog, balance, $mdToast,
                                              listBankAccountsService,
                                              createDepositRequestService) {    

		function init() {
      angular.extend($scope, {
        balance:balance,
        hide: hide,
        deposito: deposito,
        close: close
      });
      setSpeedDial();
      getListAccountBank({});

    }

    function setSpeedDial() {
        $scope.speedDial = {
          isOpen: false,
          direction: 'left',
          ngClass: 'md-fling'
        }
    }

    function getListAccountBank(command) {
        listBankAccountsService.handle(
          command, 
          getListAccountBankSuccess,
          getListAccountBankFailed
        )
    }

    function getListAccountBankSuccess(response) {
        setListaBancos(response.getList());
    }

    function getListAccountBankFailed(error) {
        console.log(error);
    }

    function setListaBancos(listaBancos) {
        $scope.listaBancos = listaBancos;
    }

    function deposito() {
        console.log($scope.command);
        createDepositRequestService.handle(
          $scope.command, 
          depositoSuccess, 
          depositoFailed
        );
    }

    function depositoSuccess(response) {
        var toastInstance = $mdToast.simple()
            .textContent('Depósito realizado exitosamente')
            .position('bottom right')
            .hideDelay(3000)

        $mdToast.show(toastInstance);

        hide();

    }

    function depositoFailed(response) {
        var toastInstance = $mdToast.simple()
            .textContent('Hubo un error al realizar el depósito')
            .position('bottom right')
            .hideDelay(3000)

        $mdToast.show(toastInstance);

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