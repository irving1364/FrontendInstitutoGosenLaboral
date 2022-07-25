(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.consejeros')
        .controller('consejerosController', consejerosController)

    function consejerosController($scope, $state, $mdToast,  
                            confirmModal, deleteConsejeroCursoService) {   
       
        angular.extend($scope, {
            init:init,
            getCursosConConsejero:getCursosConConsejero,
            modalAsignarConsejero:modalAsignarConsejero,
            modalBorrarConsejero:modalBorrarConsejero,
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
            token:	     localStorage.getItem('token'),
            cod_anio:	   localStorage.getItem('cod_anio'),
            consejero:	 0
          }; 

          axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursoSeccionConsejero', data)
          .then(function (response) {
            $scope.cursos = response.data.cursos;
            $scope.cursos.count = $scope.cursos.length;
          })
          .catch(function (error) {
            peticionFailed();
          });
          
        }

        function getCursosConConsejero(){
          var data = {	
            token:	     localStorage.getItem('token'),
            cod_anio:	   localStorage.getItem('cod_anio'),
            consejero:	 1
          }; 
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursoSeccionConsejero', data)
          .then(function (response) {
            $scope.cursos = response.data.cursos;
            $scope.cursos.count = $scope.cursos.length;
          })
          .catch(function (error) {
            peticionFailed();
          });
        }


        function maestroSuccess(){
          mensajeToast('Se elemino el Consejero del Curso');
          getCursosConConsejero();
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



     

    function modalAsignarConsejero(curso, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/consejeros/',
          'directives/modal-asignar-consejeros/modal-asignar-consejeros.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            curso: curso
          },
          controller: 'modalAsignarConsejerosController',
          close: function(e) {
            init();
          },
          cancel: function(e) {
            init();
          },
          targetEvent: ev,
      });
  };

  
  function modalBorrarConsejero(consejero, ev) {    
    var templateUrl = [
        'app/coinex-app/use-cases/consejeros/',
        'directives/modal-borrar-consejeros/modal-borrar-consejeros.html'
    ].join('');
    confirmModal({
        templateUrl: templateUrl,
        locals: {
          consejero: consejero
        },
        controller: 'modalBorrarConsejeroController',
        close: function(e) {
          getCursosConConsejero();
        },
        cancel: function(e) {
          getCursosConConsejero();
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
