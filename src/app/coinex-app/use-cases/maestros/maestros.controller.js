(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.maestros')
        .controller('maestrosController', maestrosController)

    function maestrosController($scope, $state, $mdToast,  
                            confirmModal) {   
       
        angular.extend($scope, {
            modalAsignarMaestros:modalAsignarMaestros,
            modalBorrarMaestros:modalBorrarMaestros,
            toggleLimitOptions:toggleLimitOptions,
            getTypes:getTypes,
            loadStuff:loadStuff,
            logItem:logItem,
            logOrder:logOrder,
            logPagination:logPagination
        });

        function init() {
          
          var tokens = localStorage.getItem('token');
          
          $scope.imagenUrl = localStorage.getItem('imagenUrl');

          if (tokens === null) {
            $state.go('app.login').then(mostrarMensajeLoguee);
          }          
          
          var data = {	
            cod_anio:	   localStorage.getItem('cod_anio')
          }; 

          axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursoSeccionMateriaMaestro',data)
          .then(function (response) {
            // handle success
            $scope.cursos = response.data.cursos;
            $scope.cursos.count = $scope.cursos.length;
          })
          .catch(function (error) {
            peticionFailed();
          })

        }

        function maestroSuccess(){
          mensajeToast('Se elemino el maestro del curso');
          init();
        }  

        function peticionFailed(){
          mensajeToast('No se pudo completar su peticion HTTP');
        }   

        function mensajeToast(mensaje){
          var toastInstance = $mdToast.simple()
                .textContent(mensaje)
                .position('top-right')
                .hideDelay(6000);

          $mdToast.show(toastInstance);
        }
        
        init();

        
        function modalAsignarMaestros(materia, ev) {    
          var templateUrl = [
              'app/coinex-app/use-cases/maestros/',
              'directives/modal-asignar-maestro/modal-asignar-maestro.html'
          ].join('');
          confirmModal({
              templateUrl: templateUrl,
              locals: {
              //  materia: materia
              },
              controller: 'modalAsignarMaestrosController',
              close: function(e) {
                init();
              },
              cancel: function(e) {
                init();
              },
              targetEvent: ev,
          });
        };

        function modalBorrarMaestros(maestros, ev) {    
          var templateUrl = [
              'app/coinex-app/use-cases/maestros/',
              'directives/modal-borrar-maestro/modal-borrar-maestro.html'
          ].join('');
          confirmModal({
              templateUrl: templateUrl,
              locals: {
                maestros: maestros
              },
              controller: 'modalBorrarMaestrosController',
              close: function(e) {
                init();
              },
              cancel: function(e) {
                init();
              },
              targetEvent: ev,
          });
        };    
          
        function toggleLimitOptions() {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };
          
          function getTypes() {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
          };
          
          function loadStuff() {
            $scope.promise = $timeout(function () {
              // loading
            }, 2000);
          }
          
          function logItem(item) {
            console.log(item.cod, 'was selected');
          };
          
          function logOrder(order) {
            console.log('order: ', order);
          };
          
          function logPagination(page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
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
