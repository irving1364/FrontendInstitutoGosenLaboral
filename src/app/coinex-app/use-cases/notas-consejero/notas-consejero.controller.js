(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.notas-consejero')
        .controller('notasConsejeroController', notasConsejeroController)

    function notasConsejeroController($scope, $state, $mdToast,  
                            confirmModal, getNotasSalonService) {   
       
        angular.extend($scope, {
            getEstudiantes: getEstudiantes,
            modalAddNota:modalAddNota,
            toggleLimitOptions:toggleLimitOptions,
            getTypes:getTypes,
            loadStuff:loadStuff,
            logItem:logItem,
            logOrder:logOrder,
            logPagination:logPagination
        });

        function init() {
          var tokens = localStorage.getItem('token');
          if (tokens === null) {
            $state.go('app.login').then(mostrarMensajeLoguee);
          }          
          var data = {	
            token:	     localStorage.getItem('token'),
            cod_anio:	   localStorage.getItem('cod_anio')
          };
           
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursosConsejero',data)
          .then(function (response) {
            // handle success
            $scope.cursos = response.data.cursos;
            $scope.cursos.count = $scope.cursos.length;
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function getEstudiantes(cod_curso){
          var data = {	
            token:	     localStorage.getItem('token'),
            cod_curso:	 cod_curso
          }; 
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getEstuCursosDetail',data)
          .then(function (response) {
            // handle success
            $scope.estudiantes = response.data.estudiantes;
            $scope.estudiantes.count = $scope.estudiantes.length;
          })
          .catch(function (error) {
            peticionFailed();
          })

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
     

    function modalAddNota(estudiante,trimestre, ev) {  
      var templateUrl = [
          'app/coinex-app/use-cases/notas-consejero/',
          'directives/modal-add-nota/modal-add-nota.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            estudiante: estudiante,
            cod_curso: $scope.command.cod_curso,
            trimestre: trimestre
          },
          controller: 'modalAddNotaAptitudesController',
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
            $scope.limitOptions = [5, 10, 15, 30, 50];
              
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
