(function ()
{
    'use strict';

    angular
        .module('coinex-app.use-cases.calendario')
        .controller('calendarioController', calendarioController);

    /** @ngInject */
    function calendarioController($mdToast, $mdDialog, $document, $scope, $timeout, $state,
        getEvaluaActivasAlumService)
    {

        angular.extend($scope, {
            prev:prev,
            next:next,
            goToDateToday:goToDateToday
        });

        getEvaluaActivasAlumService.handle(success, peticionFailed);

        function success(response){
            console.log(response)
            $scope.eventSources = [response.evaluaciones];
            console.log($scope.eventSources);
            
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

        var date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear();

        $scope.changeView = function(view){      
            $('[ui-calendar]').fullCalendar('changeView',view);
        };
        
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: '100%',
                editable: true,
                dayNames                 : ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort            : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                timezone                 : 'local',
                header                   : false,
                eventClick: function(date, jsEvent, view) {
                    $state.go('app.evaluacionesEstu', {
                        evaluacion: date
                    });
                    console.log(date);
                },
                columnFormat             : {
                    month: 'ddd',
                    week : 'ddd D',
                    day  : 'ddd D'
                },
                viewRender               : function (view)
                {
                    $scope.calendarView = view;
                    $scope.calendar = $scope.calendarView.calendar;
                    $scope.currentMonthShort = $scope.calendar.getDate().format('MMM');
                    $scope.currentYear = $scope.calendar.getDate().format('YYYY');
                    
                    console.log($scope.calendar.getDate().format('MMM'));
                    console.log($scope.calendar.getDate().format('YYYY'));
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };
        /*
        $scope.events = [{
        title: 'All Day Event',
        start: new Date(y, m, 1)
        }, {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
        }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
        }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
        }, {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
        }, {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'https://google.com/'
        }];*/

     //   $scope.eventSources = [$scope.events];    
        
        //console.log($scope.eventSources);

        function next()
        {
            $scope.calendarView.calendar.next();
        }
        function prev()
        {
            $scope.calendarView.calendar.prev();
        }
        function goToDateToday()
        {
            $scope.calendarView.calendar.today();
        }


    }

})();