(function() {

  'use strict';

  angular
      .module('coinex-app.use-cases.passwordAll')
      .controller('passwordAllController', passwordAllController)

  function passwordAllController($scope, $state, $mdToast, actualizarPassService,
                                  confirmModal) {   
     
      angular.extend($scope, {
        onSubmit:onSubmit,
        modalEditarUsuario:modalEditarUsuario,
        toggleLimitOptions:toggleLimitOptions,
        loadStuff:loadStuff
      });

      function init() {
        var tokens = localStorage.getItem('token');
        if (tokens === null) {
          $state.go('app.login').then(mostrarMensajeLoguee);
        }         

          var data = {	
            token:	   localStorage.getItem('token'),
            cod_anio:	 localStorage.getItem('cod_anio')
          }; 
          
          axios.post(localStorage.getItem("apiUrl") +'auth/getUsuarios', data)
          .then(function (response) {
            // handle success
            $scope.users = response.data.users;
            $scope.users.count = $scope.users.length;
          })
          .catch(function (error) {
            peticionFailed();
          })           
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

      function modalEditarUsuario(usuario, ev) {    
        var templateUrl = [
            'app/coinex-app/use-cases/password-all/',
            'directives/modal-editar-pass/modal-editar-pass.html'
        ].join('');
        confirmModal({
            templateUrl: templateUrl,
            locals: {
              usuario: usuario
            },
            controller: 'modalEditUsuarioController',
            close: function(e) {
              
            },
            cancel: function(e) {
              
            },
            targetEvent: ev,
        });
    };

      
      function toggleLimitOptions() {
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
      };
      
      
      function loadStuff() {
        $scope.promise = $timeout(function () {
          // loading
        }, 2000);
      }
      
      $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];
          
          $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: true,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
          };
          
          $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
          };


  }

})();

