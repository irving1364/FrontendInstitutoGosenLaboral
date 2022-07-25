(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.dashboard')
        .controller('dashboardController', dashboardController)

    function dashboardController($scope,$mdToast, getDashboardService,
                                 confirmModal) {   
       
        angular.extend($scope, {
          init:init
        });

        function init() {
          getDashboardService.handle(dashboardSuccess, Failed);
        }

        function dashboardSuccess(response) {
          $scope.command = response;            
        }   

        function Failed(response) {
          var mensaje = 'Ocurrio un error';
          var toastInstance = $mdToast.simple()
                .textContent(mensaje)
                .position('top-right')
                .hideDelay(6000);
          $mdToast.show(toastInstance);
        }        
    
        init();

        //setInterval(init, 5000);
        
    }

})();
