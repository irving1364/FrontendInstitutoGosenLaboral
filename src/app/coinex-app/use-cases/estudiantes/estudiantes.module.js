(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.estudiantes', [])
        .config(estudiantes);

    function estudiantes($stateProvider) {

        $stateProvider.state('app.estudiantes', {
            url: '/estudiantes',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/estudiantes/estudiantes.html',
                    controller : 'estudiantesController'
                }
            }
        });

    }


})();