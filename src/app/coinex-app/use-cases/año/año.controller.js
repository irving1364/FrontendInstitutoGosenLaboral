(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.año')
        .controller('añoController', añoController)

    function añoController($scope, $state, $mdToast, updateLecturaService, 
                           updateActivoService, confirmModal) {   
       
        angular.extend($scope, {
            modalAgregarMaestro:modalAgregarMaestro,
            modalEditarMaestro:modalEditarMaestro,
            modalAgregarMateria:modalAgregarMateria,
            modalEditarMateria:modalEditarMateria,
            modalAgregarCurso: modalAgregarCurso,
            modalEditarCurso: modalEditarCurso,
            tabCursos: tabCursos,
            tabMaterias:tabMaterias,
            tabMaestros:tabMaestros,
            onActivo:onActivo,
            onLectura:onLectura,
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
          
          axios.get(localStorage.getItem("apiUrl") +'Tabla/getAnio')
          .then(function (response) {
            // handle success
            $scope.anio = response.data.anio;
            $scope.anio.count = $scope.anio.length;
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function tabCursos(){
          axios.get(localStorage.getItem("apiUrl") +'Tabla/getCursos')
          .then(function (response) {
            // handle success
            $scope.cursos = response.data.cursos;
            $scope.cursos.count = $scope.cursos.length;
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function tabMaterias(){
          var data = {	
            cod_anio:	   localStorage.getItem('cod_anio')
            }; 
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getMaterias', data)
          .then(function (response) {
            // handle success
            $scope.materias = response.data.materias;
            $scope.materias.count = $scope.materias.length;
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function tabMaestros(){
          var data = {	
            cod_anio:	   localStorage.getItem('cod_anio')
          }; 
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getMaestros', data)
          .then(function (response) {
            // handle success
            $scope.maestros = response.data.maestros;
            $scope.maestros.count = $scope.maestros.length;
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function onLectura(command) {
            updateLecturaService.handle(command, lecturaSuccess, peticionFailed);
        }

        function onActivo(command) {
          updateActivoService.handle(command, lecturaSuccess, peticionFailed);
        }


        



        function lecturaSuccess(){
          init();
          mensajeToast('Se realizo su cambio');
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



      function modalAgregarCurso( ev) {    
          var templateUrl = [
              'app/coinex-app/use-cases/año/',
              'directives/modal-agregar-curso/modal-agregar-curso.html'
          ].join('');
          confirmModal({
              templateUrl: templateUrl,
              locals: {
              },
              controller: 'modalAgregarCursoController',
              close: function(e) {
                tabCursos();
              },
              cancel: function(e) {
                tabCursos();
              },
              targetEvent: ev,
          });
      };

    function modalEditarCurso(curso, ev) {    
        var templateUrl = [
            'app/coinex-app/use-cases/año/',
            'directives/modal-editar-curso/modal-editar-curso.html'
        ].join('');
        confirmModal({
            templateUrl: templateUrl,
            locals: {
              curso: curso
            },
            controller: 'modalEditCursoController',
            close: function(e) {
              tabCursos();
            },
            cancel: function(e) {
              tabCursos();
            },
            targetEvent: ev,
        });
    };
    
    function modalAgregarMateria(materia, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/año/',
          'directives/modal-agregar-materia/modal-agregar-materia.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            materia: materia
          },
          controller: 'modalAgregarMateriaController',
          close: function(e) {
            tabMaterias();
          },
          cancel: function(e) {
            tabMaterias();
          },
          targetEvent: ev,
      });
    };

    function modalEditarMateria(materia, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/año/',
          'directives/modal-editar-materia/modal-editar-materia.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            materia: materia
          },
          controller: 'modalEditMateriaController',
          close: function(e) {
            tabMaterias();
          },
          cancel: function(e) {
            tabMaterias();
          },
          targetEvent: ev,
      });
    };    

    function modalAgregarMaestro(maestro, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/año/',
          'directives/modal-agregar-maestro/modal-agregar-maestro.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            maestro: maestro
          },
          controller: 'modalAgregarMaestroController',
          close: function(e) {
            tabMaestros();
          },
          cancel: function(e) {
            tabMaestros();
          },
          targetEvent: ev,
      });
    };

    function modalEditarMaestro(maestro, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/año/',
          'directives/modal-editar-maestro/modal-editar-maestro.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            maestro: maestro
          },
          controller: 'modalEditMaestroController',
          close: function(e) {
            tabMaestros();
          },
          cancel: function(e) {
            tabMaestros();
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
