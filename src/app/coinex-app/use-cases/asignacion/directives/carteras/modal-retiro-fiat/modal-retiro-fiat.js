(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('modalRetiroFiat', modalRetiroFiat)
		.controller('modalRetiroFiatController', modalRetiroFiatController);


	function modalRetiroFiat($mdDialog) {

		return function(attrs) {

			$mdDialog.show({
          locals: {
          	balance: attrs.locals.balance
          },
        	controller: 'modalRetiroFiatController',
        	templateUrl: [
        		    'app/coinex-app/use-cases/login/',
                'directives/modal-cargando-login/',
                'modal-cargando-login.html'
    		].join(''),
        	parent: angular.element(document.body),
        	targetEvent: attrs.ev,
        	clickOutsideToClose:true,
        	fullscreen: true
      })
            
      .then(attrs.close, attrs.hide);
	  };


	}

	function modalRetiroFiatController($scope, $state,  $mdDialog, newAddresService , $mdToast) {
    
    function init() {
      angular.extend($scope, {
        hide: hide,
        close: close
      });

      $scope.mensaje="Verificando Url ingresada";
      newAddresService.handle(localStorage.URL, newAddresSuccess, newAddresFailed);
    }

    function newAddresSuccess(response) {
           $state.go('app.dashboard').then(mostrarMensajeDeBienvenida);
           close(); 
    }

    function newAddresFailed(response) {
            close(); 
            console.log('no es valida');
            var mensaje = 'Ocurrio un error la url ingresada no es valida';
            var toastInstance = $mdToast.simple()
                  .textContent(mensaje)
                  .position('top-right')
                  .hideDelay(6000);

            $mdToast.show(toastInstance);

    }

    function mostrarMensajeDeBienvenida(response) {

        var toastInstance, mensaje;

        mensaje = 'Bienvenido';
        
        toastInstance = $mdToast.simple()
            .textContent(mensaje)
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
