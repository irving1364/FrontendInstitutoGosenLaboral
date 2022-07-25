(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.password')
        .controller('passwordController', passwordController)

    function passwordController($scope, $state, $mdToast, actualizarPassService
                            ) {   
       
        angular.extend($scope, {
          onSubmit:onSubmit
        });

        function init() {
          var tokens = localStorage.getItem('token');
          if (tokens === null) {
            $state.go('app.login').then(mostrarMensajeLoguee);
          }                    
        }

        function onSubmit(command){
          console.log(command);
          if($scope.command.passNueva === command.passNueva2){
              actualizarPassService.handle(command, actualizarSuccess, peticionFailed);
          }else{
            mensajeToast('Las contraseñas no coinciden');
          }
          

        }

        function actualizarSuccess(response){
          console.log(response);
          mensajeToast('Se actualizo su contraseña con exito');
        
          $scope.command.pass = '';
				  $scope.command.passNueva = '';
				  $scope.command.passNueva2 = '';
        
        } 

        function peticionFailed(response){
          console.log(response);
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
