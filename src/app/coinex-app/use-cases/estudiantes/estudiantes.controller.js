(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.estudiantes')
        .controller('estudiantesController', estudiantesController)

    function estudiantesController($scope, $state, $mdToast, updateLecturaService, 
                           updateActivoService, confirmModal) {   
       
        angular.extend($scope, {
            getEstuCurso: getEstuCurso,
            modalVerMateriaEstudiante:modalVerMateriaEstudiante,
            modalAsignarMateriaEstudiante:modalAsignarMateriaEstudiante,
            modalAsignarEstudiante:modalAsignarEstudiante,
            modalVerCursoEstudiante:modalVerCursoEstudiante,
            estuCurso: estuCurso,
            estuAsignar: estuAsignar,
            modalAgregarEstudiante: modalAgregarEstudiante,
            modalEditarEstudiante: modalEditarEstudiante,
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
            cod_anio:	   localStorage.getItem('cod_anio')
          }; 

          axios.post(localStorage.getItem("apiUrl") +'Tabla/getEstudiantes',data)
          .then(function (response) {
            // handle success
            $scope.estus = response.data.estu;
            $scope.estus.count = $scope.estus.length;
          })
          .catch(function (error) {
            peticionFailed();
          })

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

        function estuAsignar(){
          var data = {	
            cod_anio:	   localStorage.getItem('cod_anio')
          }; 
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getEstudiantesAsignar',data)
          .then(function (response) {
            // handle success
            $scope.estu = response.data.estu;
            $scope.estu.count = $scope.estu.length;
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function estuCurso(){
          var data = {	
						token:		   localStorage.getItem('token'),
						cod_anio:	   localStorage.getItem('cod_anio')
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/getCursosDetail', data)
					.then(function (response) {
						// handle success
						$scope.cursos = response.data.cursos;
						$scope.cursos.count = $scope.cursos.length;
					})
					.catch(function (error) {
						peticionFailed();
					})  
        }

        function getEstuCurso(command){
          var data = {	
						cod_curso:	 command.cod_curso
					}; 
			
					axios.post(localStorage.getItem("apiUrl") +'Tabla/getEstuCursosDetailActivo', data)
					.then(function (response) {
						$scope.estudiantesCurso = response.data.estudiantes;
						$scope.estudiantesCurso.count = $scope.estudiantesCurso.length;
					})
					.catch(function (error) {
					//	peticionFailed();
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

      function modalAgregarEstudiante( ev) {    
          var templateUrl = [
              'app/coinex-app/use-cases/estudiantes/',
              'directives/modal-agregar-estudiante/modal-agregar-estudiante.html'
          ].join('');
          confirmModal({
              templateUrl: templateUrl,
              locals: {
              },
              controller: 'modalAddEstudiantesController',
              close: function(e) {
                init();
              },
              cancel: function(e) {
                init();
              },
              targetEvent: ev,
          });
      };

    function modalEditarEstudiante(estudiante, ev) {    
        var templateUrl = [
            'app/coinex-app/use-cases/estudiantes/',
            'directives/modal-editar-estudiante/modal-editar-estudiante.html'
        ].join('');
        confirmModal({
            templateUrl: templateUrl,
            locals: {
              estudiante: estudiante
            },
            controller: 'modalEditEstudianteController',
            close: function(e) {
              init();
            },
            cancel: function(e) {
              init();
            },
            targetEvent: ev,
        });
    };

    function modalAsignarEstudiante(selected, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/estudiantes/',
          'directives/modal-asignar-estudiante/modal-asignar-estudiante.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            estudiantes: selected
          },
          controller: 'modalAsignarEstudianteController',
          close: function(e) {
            init();
            estuAsignar();
          },
          cancel: function(e) {
            init();
            estuAsignar();
          },
          targetEvent: ev,
      });
    };
    
    function modalVerCursoEstudiante(selected, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/estudiantes/',
          'directives/modal-ver-curso-estudiante/modal-ver-curso-estudiante.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            estudiantes: selected
          },
          controller: 'modalVerCursoEstudianteController',
          close: function(e) {
            init();
            estuAsignar();
          },
          cancel: function(e) {
            init();
            estuAsignar();
          },
          targetEvent: ev,
      });
    };

    function modalVerMateriaEstudiante(selected, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/estudiantes/',
          'directives/modal-ver-materia-estudiante/modal-ver-materia-estudiante.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            estudiante: selected,
            cod_curso: $scope.command.cod_curso
          },
          controller: 'modalVerMateriaEstudianteController',
          close: function(e) {
            init();
            estuAsignar();
          },
          cancel: function(e) {
            init();
            estuAsignar();
          },
          targetEvent: ev,
      });
    };
    
    function modalAsignarMateriaEstudiante(selected, ev) {    
      var templateUrl = [
          'app/coinex-app/use-cases/estudiantes/',
          'directives/modal-asignar-materia-estudiante/modal-asignar-materia-estudiante.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            estudiante: selected,
            cod_curso: $scope.command.cod_curso
          },
          controller: 'modalAsignarMateriaEstudianteController',
          close: function(e) {
            init();
            estuAsignar();
          },
          cancel: function(e) {
            init();
            estuAsignar();
          },
          targetEvent: ev,
      });
    };

        function toggleLimitOptions() {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15, 30, 50];
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

         
    }

})();
