(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.asignacion', [])
        .config(asignacion);

    function asignacion($stateProvider) {

        $stateProvider.state('app.asignacion', {
            url: '/asignacion',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/asignacion/asignacion.html',
                    controller : 'asignacionController'
                }
            }
        });

    }


})();