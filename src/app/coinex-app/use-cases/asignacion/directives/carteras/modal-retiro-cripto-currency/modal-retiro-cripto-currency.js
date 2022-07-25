(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('modalRetiroCriptoCurrency', modalRetiroCriptoCurrency)
		.controller('modalRetiroCriptoCurrencyController', modalRetiroCriptoCurrencyController);


	function modalRetiroCriptoCurrency($mdDialog) {

		return function(attrs) {

			$mdDialog.show({
          locals: {
          },
        	controller: 'modalRetiroCriptoCurrencyController',
        	templateUrl: [
        		'app/coinex-app/use-cases/dashboard/',
        		'directives/carteras/modal-retiro-cripto-currency/',
        		'modal-retiro-cripto-currency.html'
    		].join(''),
        	parent: angular.element(document.body),
        	targetEvent: attrs.ev,
        	clickOutsideToClose:true,
        	fullscreen: true
      })
        
      .then(attrs.close, attrs.hide);
		};

	}

	function modalRetiroCriptoCurrencyController($scope, $mdDialog, newAddresService, 
                                               etiquetasService, $mdToast,$rootScope,
                                               robotService, sitemapService, 
                                               robotsService, crawlService,
                                               linksService) {

    var currencies = [];
    
		function init() {
      angular.extend($scope, {
        hide: hide,
        close: close
      });

      $scope.mensaje="Cargando Speed y Usabilidad";

      newAddresService.handle(localStorage.URL, newAddresSuccess, newAddresFailed); 

    }

    function newAddresSuccess(response) {
            
            $scope.googleFast = response;
            setTimeout(function(){
                $rootScope.$broadcast('fast', $scope.googleFast);
                console.log($rootScope); 
                $scope.mensaje="Recorrido interno al sitio";
                etiquetasService.handle(localStorage.URL, etiquetasSuccess, etiquetasFailed);            
            }, 2000);
            
        }

    function newAddresFailed(response) {
        console.log(response);
        var mensaje = 'Ocurrio un error consultando';
        var toastInstance = $mdToast.simple()
              .textContent(mensaje)
              .position('top-right')
              .hideDelay(6000);

        $mdToast.show(toastInstance);
    }

    function etiquetasSuccess(response) {

        $scope.mensaje="Verificando Robots";
        $scope.etiquetas = response.data;
        console.log($scope.etiquetas);
                $rootScope.$broadcast('etiquetas', $scope.etiquetas);
                robotsService.handle(localStorage.URL, robotSuccess, robotFailed);      

    }

    function etiquetasFailed(response) {
        console.log(response);
        var mensaje = 'Ocurrio un error consultando';
        var toastInstance = $mdToast.simple()
              .textContent(mensaje)
              .position('top-right')
              .hideDelay(6000);

        $mdToast.show(toastInstance);
    }

    function robotSuccess(response) {
        console.log(response);
        $scope.robot = response.status;
        $scope.mensaje="Verificando Sitemap";
        console.log($scope.robot);
                $rootScope.$broadcast('robot', $scope.robot);
                console.log($rootScope);      
        sitemapService.handle(localStorage.URL, sitemapSuccess, sitemapFailed);
        
    }

    function robotFailed(response) {
        $scope.robot = response.status;
        $scope.mensaje="Verificando Sitemap";
        console.log($scope.robot);
                $rootScope.$broadcast('robot', $scope.robot);
                console.log($rootScope);      
        sitemapService.handle(localStorage.URL, sitemapSuccess, sitemapFailed);        
    }

    function sitemapSuccess(response) {
        $scope.sitemap = response.status;
        $scope.mensaje="Verificando Crawl";
        console.log($scope.sitemap);
                $rootScope.$broadcast('sitemap', $scope.sitemap);
                console.log($scope.sitemap);      
        crawlService.handle(localStorage.URL, crawlSuccess, crawlFailed);

    }

    function sitemapFailed(response) {
       $scope.sitemap = response.status;
        $scope.mensaje="Verificando Crawl";
        console.log($scope.sitemap);
                $rootScope.$broadcast('sitemap', $scope.sitemap);
                console.log($scope.sitemap);      
        
    }    

    function crawlSuccess(response) {
        $scope.crawl = response;

                $rootScope.$broadcast('crawl', $scope.crawl);
                for (var i = response.links.length - 1; i >= 0; i--) {
 
                        linksService.handle(localStorage.URL, response.links[i], linksSuccess, linksFailed);
                }
        setTimeout(function(){
                close();            
            }, 2000);        
                    
        
    }

    function crawlFailed(response) {
       $scope.crawl = response;
        console.log($scope.crawl);
                $rootScope.$broadcast('crawl', $scope.crawl);
                console.log($scope.crawl);      
        close();
    }

    function linksSuccess(response) {

        console.log(response);
        if (response.data.status == 200){
            $rootScope.$broadcast('linkVerificados', response.config);
        } else{
            $rootScope.$broadcast('linkCaidos', response.config);
        }

    }

    function linksFailed(response) {
       console.log(response);
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
