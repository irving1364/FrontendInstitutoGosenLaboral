(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.evaluaciones')
        .controller('evaluacionesController', evaluacionesController)

    function evaluacionesController($scope, $state, $mdToast,  
                            confirmModal, getNotasSalonService,
                            getEvaluaMaestroService, getEvaluaMaestroTrimestreService) {   
       
        angular.extend($scope, {
            init:init,
            tabEvaluar:tabEvaluar,
            getEvaluaciones: getEvaluaciones,
            getEstuEvaluacion:getEstuEvaluacion,
            getEvaluacionesMaestro:getEvaluacionesMaestro,
            getEvaluacionesMaestroTrimestre:getEvaluacionesMaestroTrimestre,
            modalAddEvaluaGrado:modalAddEvaluaGrado,
            modalEditEvaluaGrado: modalEditEvaluaGrado,
            modalEvaluaAlumno:modalEvaluaAlumno,
            modalBorrarEvaluaGrado:modalBorrarEvaluaGrado,
            modalAddArchivoEvaluacion:modalAddArchivoEvaluacion,
            modalVerArchivoAlumEva:modalVerArchivoAlumEva,
            modalEvaAbrir:modalEvaAbrir,
            modalEvaCerrar:modalEvaCerrar,
            modalAddArchivoCorrecion:modalAddArchivoCorrecion,
            modalDuplicarEvaluacion:modalDuplicarEvaluacion,
            modalAusenciaTardanza:modalAusenciaTardanza,
            toggleLimitOptions:toggleLimitOptions,
            loadStuff:loadStuff,
        });

        function init() {
          var tokens = localStorage.getItem('token');
          if (tokens === null) {
            $state.go('app.login').then(mostrarMensajeLoguee);
          }      
          $scope.command = {};
          $scope.commandcod_curso = '';
          $scope.evaluaciones = '';
          var data = {	
            token:	     localStorage.getItem('token'),
            cod_anio:	   localStorage.getItem('cod_anio')
          }; 
          axios.post(localStorage.getItem("apiUrl") +'Tabla/getMateriaMaestro',data)
          .then(function (response) {
            // handle success
            $scope.cursos = response.data.materias;
            $scope.cursos.count = $scope.materias.length;
          })
          .catch(function (error) {
          //  peticionFailed();
          })
        }

        function tabEvaluar(){
          $scope.command.cod_curso = '';
          $scope.evaluacionesEstu = '';
        }

        function getEvaluaciones(command){
          
          var data = {	
            token:	             localStorage.getItem('token'),
            cod_anio:	           localStorage.getItem('cod_anio'),
            cod_curso_materia:	 $scope.command.cod_curso.cod
          }; 
          axios.post(localStorage.getItem("apiUrl") +'evaluacion/getEvaluacionesActivasCurso',data)
          .then(function (response) {
            // handle success
     
            $scope.evaluaciones = response.data.evaluaciones;
            $scope.evaluaciones.count = $scope.evaluaciones.length;
            $scope.command.cod_evaluacion ='';
          })
          .catch(function (error) {
            peticionFailed();
          })
        }

        function getEvaluacionesMaestro(){
          $scope.evaluacionesMaestro = '';
          getEvaluaMaestroService.handle(maestroSuccess, peticionFailed);
        }

        function getEvaluacionesMaestroTrimestre(trimestre){
          console.log(trimestre);
          getEvaluaMaestroTrimestreService.handle(trimestre, maestroSuccess, peticionFailed);
        }

        function maestroSuccess(response){
          $scope.evaluacionesMaestro = response.evaluaciones;
        }

        function getEstuEvaluacion(command){
          
          var data = {	
            token:	             localStorage.getItem('token'),
            cod_anio:	           localStorage.getItem('cod_anio'),
            cod_evaluacion:   	 command.cod_evaluacion
          }; 
          axios.post(localStorage.getItem("apiUrl") +'evaluacion/getevaluacionEstu',data)
          .then(function (response) {
            // handle success
           
            $scope.evaluacionesEstu = response.data.evaluacionesEstu;
            $scope.evaluacionesEstu.count = $scope.evaluacionesEstu.length;
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
     

          function modalAddEvaluaGrado(ev) {  
            //console.log($scope.command.cod_curso);  
            var templateUrl = [
                'app/coinex-app/use-cases/evaluaciones/',
                'directives/modal-add-eva-grado/modal-add-eva-grado.html'
            ].join('');
            confirmModal({
                templateUrl: templateUrl,
                locals: {
                  //estudiante: estudiante,
                  cod_curso_materia: $scope.command.cod_curso
                },
                controller: 'modalAddEvaGradoController',
                close: function(e) {
              
                },
                cancel: function(e) {
              
                },
                targetEvent: ev,
            });
        };


        function modalEditEvaluaGrado(eva, ev) {  
          var evalua = {};
          
          evalua = eva;
          
          //evalua.fechas = new Date(evalua.fechas);
          //evalua.fechas.setDate(evalua.fechas.getDate() + 1);
          
          var templateUrl = [
              'app/coinex-app/use-cases/evaluaciones/',
              'directives/modal-editar-eva-grado/modal-editar-eva-grado.html'
          ].join('');
          confirmModal({
              templateUrl: templateUrl,
              locals: {
                evalua: evalua
              },
              controller: 'modalEditarEvaGradoController',
              close: function(e) {
                getEvaluaciones($scope.command.cod_curso);
              },
              cancel: function(e) {
                getEvaluaciones($scope.command.cod_curso);
              },
              targetEvent: ev,
          });
      };


      function modalEvaluaAlumno(eva, ev) {  
    
        var templateUrl = [
            'app/coinex-app/use-cases/evaluaciones/',
            'directives/modal-add-puntuacion/modal-add-puntuacion.html'
        ].join('');
        confirmModal({
            templateUrl: templateUrl,
            locals: {
              evalua: eva
            },
            controller: 'modalAddPuntuacionController',
            close: function(e) {
          //    getEvaluaciones($scope.command.cod_curso);
            },
            cancel: function(e) {
            //  getEvaluaciones($scope.command.cod_curso);
            },
            targetEvent: ev,
        });
    };


      
      function modalBorrarEvaluaGrado(eva, ev) {  
        
        
        var templateUrl = [
            'app/coinex-app/use-cases/evaluaciones/',
            'directives/modal-borrar-eva-grado/modal-borrar-eva-grado.html'
        ].join('');
        confirmModal({
            templateUrl: templateUrl,
            locals: {
              cod_curso_materia: $scope.command.cod_curso,
              eva: eva
            },
            controller: 'modalBorrarEvaluacionController',
            close: function(e) {
        
            },
            cancel: function(e) {
        
            },
            targetEvent: ev,
        });
    };

    function modalAddArchivoEvaluacion(eva, ev) {  
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones/',
          'directives/modal-add-archivo-evaluacion/modal-add-archivo-evaluacion.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            cod_curso_materia: $scope.command.cod_curso,
            eva: eva
          },
          controller: 'modalAddArchivoEvaluacionController',
          close: function(e) {
          //  init();
          },
          cancel: function(e) {
          //  init();
          },
          targetEvent: ev,
      });
  };

  function modalVerArchivoAlumEva(eva, ev) {  

      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones/',
          'directives/modal-ver-evaluacion-estu/modal-ver-evaluacion-estu.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            cod_curso_materia: $scope.command.cod_curso,
            eva: eva,
            cod_evaluacion: $scope.command.cod_evaluacion
          },
          controller: 'modalVerArchivoAlumEvaController',
          close: function(e) {
          
          },
          cancel: function(e) {
          
          },
          targetEvent: ev,
      });
  };

  function modalEvaCerrar(eva, ev) {  
      console.log(eva);
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones/',
          'directives/modal-eva-cerrar/modal-eva-cerrar.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalEvaCerrarController',
          close: function(e) {
            getEvaluacionesMaestro();
          },
          cancel: function(e) {
            getEvaluacionesMaestro();
          },
          targetEvent: ev,
      });
  };

  function modalEvaAbrir(eva, ev) {  
      console.log(eva);
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones/',
          'directives/modal-eva-abrir/modal-eva-abrir.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalEvaAbrirController',
          close: function(e) {
            getEvaluacionesMaestro();
          },
          cancel: function(e) {
            getEvaluacionesMaestro();
          },
          targetEvent: ev,
      });
  };  
  
  function modalAddArchivoCorrecion(eva, ev) {  
      console.log(eva);
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones/',
          'directives/modal-add-archivo-correcion/modal-add-archivo-correcion.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva,
            cod_evaluacion: $scope.command.cod_evaluacion
          },
          controller: 'modalAddArchivoCorrecionController',
          close: function(e) {
            getEvaluacionesMaestro();
          },
          cancel: function(e) {
            getEvaluacionesMaestro();
          },
          targetEvent: ev,
      });
  };

  function modalDuplicarEvaluacion(eva, ev) {  
    console.log(eva);
    var templateUrl = [
        'app/coinex-app/use-cases/evaluaciones/',
        'directives/modal-duplicar-eva-grado/modal-duplicar-eva-grado.html'
    ].join('');
    confirmModal({
        templateUrl: templateUrl,
        locals: {
          eva: eva,
          cod_curso: $scope.command.cod_curso
        },
        controller: 'modalDuplicarEvaGradoController',
        close: function(duplicadas, e) {
          modalDuplicarResultado(duplicadas);
        },
        cancel: function(e) {
          getEvaluaciones($scope.command.cod_curso);
        },
        targetEvent: ev,
    });
  };
  
  function modalDuplicarResultado(duplicadas, ev) {  
    console.log(duplicadas);
    var templateUrl = [
        'app/coinex-app/use-cases/evaluaciones/',
        'directives/modal-duplicar-resultado/modal-duplicar-resultado.html'
    ].join('');
    confirmModal({
        templateUrl: templateUrl,
        locals: {
          duplicadas: duplicadas
        },
        controller: 'modalDuplicarResultadoController',
        close: function(e) {
          getEvaluaciones($scope.command.cod_curso);
        },
        cancel: function(e) {
          getEvaluaciones($scope.command.cod_curso);
        },
        targetEvent: ev,
    });
  };

  function modalAusenciaTardanza(eva, ev) {  
    console.log(eva);
    var templateUrl = [
        'app/coinex-app/use-cases/evaluaciones/',
        'directives/modal-ausencia-tardanza/modal-ausencia-tardanza.html'
    ].join('');
    confirmModal({
        templateUrl: templateUrl,
        locals: {
          eva: eva
        },
        controller: 'modalAusenciaTardanzaController',
        close: function(e) {
        //  getEvaluaciones($scope.command.cod_curso);
        },
        cancel: function(e) {
        //  getEvaluaciones($scope.command.cod_curso);
        },
        targetEvent: ev,
    });
  };
  
        
  function toggleLimitOptions() {
      $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15, 30, 50];
  };
    
  
  function loadStuff() {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
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
      limit: 30,
      page: 1
    };
  }

})();
