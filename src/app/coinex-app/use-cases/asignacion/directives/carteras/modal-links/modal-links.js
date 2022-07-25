(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('modalLinks', modalLinks)
		.controller('modalLinksController', modalLinksController);


	function modalLinks($mdDialog) {

		return function(attrs) {

			$mdDialog.show({
          locals: {
          	linksVerificados: attrs.locals.linksVerificados
          },
        	controller: 'modalLinksController',
        	templateUrl: [
        		'app/coinex-app/use-cases/dashboard/',
        		'directives/carteras/modal-links/',
        		'modal-links.html'
    		].join(''),
        	parent: angular.element(document.body),
        	targetEvent: attrs.ev,
        	clickOutsideToClose:true,
        	fullscreen: false
      })
        
      .then(attrs.close, attrs.hide);
		};

    console.log(locals);

	}

	function modalLinksController($scope, $mdDialog, linksVerificados) {
    

		function init() {
      angular.extend($scope, {
        linksVerificados:linksVerificados,
        hide: hide,
        close: close
      });

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