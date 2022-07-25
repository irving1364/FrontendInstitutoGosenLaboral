(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.evaluacionesEstu')
        .controller('evaluacionesEstuController', evaluacionesEstuController)

    function evaluacionesEstuController($scope, $state, $mdToast,  
                            confirmModal, getEvaluaActivasAlumService,
                            $translate, $stateParams, getEvaluaCerradasAlumService) {   
       
        angular.extend($scope, {
            getEvaluacionesCerradas: getEvaluacionesCerradas,
            tabEvaluar:tabEvaluar,
            modalAddComentario:modalAddComentario,
            modalVerEvaluacion:modalVerEvaluacion,
            modalVerEvaluacionCerrada:modalVerEvaluacionCerrada,
            modalAddArchivo:modalAddArchivo,
            modalVerArchivos:modalVerArchivos,
            modalVerAusenciaTardanza:modalVerAusenciaTardanza,
            toggleLimitOptions:toggleLimitOptions,
            getTypes:getTypes,
            loadStuff:loadStuff,
        });

        function init() {
          var tokens = localStorage.getItem('token');
          /*if (tokens === null) {
            $state.go('app.login').then(mostrarMensajeLoguee);
          } */         
          var data = {	
            token:	     localStorage.getItem('token'),
            cod_anio:	   localStorage.getItem('cod_anio')
          }; 

          console.log($stateParams);
          
          if($stateParams.evaluacion){
            console.log($stateParams.evaluacion)
            $stateParams.evaluacion.end = moment($stateParams.evaluacion.end).format('MMMM d, YYYY h:mma');     
            modalVerEvaluacion($stateParams.evaluacion)
          }
          
          getEvaluaActivasAlumService.handle(success, peticionFailed);
        }
        
        function success(response){
            $scope.evaluaciones = response.evaluaciones;
            $scope.evaluaciones.count = $scope.evaluaciones.length;       
        }

        function peticionFailed(){
            mensajeToast('No se pudo completar su peticion HTTP');
        }   

        function tabEvaluar(){
          $scope.command.cod_curso = '';
        }

        function mensajeToast(mensaje){
          var toastInstance = $mdToast.simple()
                .textContent(mensaje)
                .position('top-right')
                .hideDelay(6000);

          $mdToast.show(toastInstance);
        }
        
      init();

      function getEvaluacionesCerradas(){
        getEvaluaCerradasAlumService.handle(cerradassuccess, peticionFailed);
      }

      function cerradassuccess(response){
        $scope.evaluacionesCerradas = response.evaluaciones;
        $scope.evaluacionesCerradas.count = $scope.evaluaciones.length;       
    }
             
      function modalVerEvaluacion(eva, ev) {  
        
        var templateUrl = [
            'app/coinex-app/use-cases/evaluaciones-estu/',
            'directives/modal-ver-evaluacion/modal-ver-evaluacion.html'
        ].join('');
        confirmModal({
            templateUrl: templateUrl,
            locals: {
              eva: eva
            },
            controller: 'modalVerEvaluacionController',
            close: function(e) {
            
            },
            cancel: function(e) {
            
            },
            targetEvent: ev,
        });
    };

    function modalVerEvaluacionCerrada(eva, ev) {  
        
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones-estu/',
          'directives/modal-ver-evaluacion-cerrada/modal-ver-evaluacion-cerrada.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalVerEvaluacionCerradaController',
          close: function(e) {
          
          },
          cancel: function(e) {
          
          },
          targetEvent: ev,
      });
  };

    function modalVerArchivos(eva, ev) {  
        
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones-estu/',
          'directives/modal-ver-archivos/modal-ver-archivos.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalVerArchivosController',
          close: function(e) {
          
          },
          cancel: function(e) {
          
          },
          targetEvent: ev,
      });
  };
    
    
    function modalAddArchivo(eva, ev) {  
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones-estu/',
          'directives/modal-add-evaluacion-estu/modal-add-evaluacion-estu.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalAddArchivoCommentController',
          close: function(e) {
          
          },
          cancel: function(e) {
          
          },
          targetEvent: ev,
      });
    };

    function modalVerAusenciaTardanza(eva, ev) {  
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones-estu/',
          'directives/modal-ver-ausencia-tardanza/modal-ver-ausencia-tardanza.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalVerAusenciaTardanzaController',
          close: function(e) {
          
          },
          cancel: function(e) {
          
          },
          targetEvent: ev,
      });
    };
  
    function modalAddComentario(eva, ev) {  
      var templateUrl = [
          'app/coinex-app/use-cases/evaluaciones-estu/',
          'directives/modal-add-comentario/modal-add-comentario.html'
      ].join('');
      confirmModal({
          templateUrl: templateUrl,
          locals: {
            eva: eva
          },
          controller: 'modalAddComentarioController',
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

          $scope.selected = [];
            $scope.limitOptions = [15, 30, 50];
              
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
