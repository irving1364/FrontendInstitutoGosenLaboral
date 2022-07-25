(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.login')
		.factory('modalCargandoLogin', modalCargandoLogin)
		.controller('modalCargandoLoginController', modalCargandoLoginController);

	function modalCargandoLogin($mdDialog) {

		return function(attrs) {

    		$mdDialog.show({
              locals: {
              },
            	controller: 'modalCargandoLoginController',
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

	function modalCargandoLoginController($scope, $mdDialog, newAddresService, 
                                          $mdToast,$rootScope) {

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
