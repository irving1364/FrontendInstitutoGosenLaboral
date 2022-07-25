(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.perfil')
        .controller('perfilController', perfilController)

    function perfilController($scope, $state, $mdToast, actualizarCorreoService,
                              getCorreoService) {   
       
        angular.extend($scope, {
          onSubmit:onSubmit
        });

        function getCorreo(){
          getCorreoService.handle(correoSuccess, peticionFailed);
        }

        function correoSuccess(response){
          $scope.command = {};
          $scope.command.correo = response.correo[0].correo;
          console.log($scope.command.correo);
        }

        function init() {
          var tokens = localStorage.getItem('token');
          if (tokens === null) {
            $state.go('app.login').then(mostrarMensajeLoguee);
          }
          getCorreo();                    
        }

        function onSubmit(command){
          actualizarCorreoService.handle(command, actualizarSuccess, peticionFailed);
        }

        function actualizarSuccess(response){
          mensajeToast(response.response.mensaje);
          getCorreo();
        } 

        function peticionFailed(response){
          mensajeToast(response.mensaje);
        }   

        function mensajeToast(mensaje){
          var toastInstance = $mdToast.simple()
                .textContent(mensaje)
                .position('top-right')
                .hideDelay(6000);

          $mdToast.show(toastInstance);
        }
        
        init();


    }

})();
