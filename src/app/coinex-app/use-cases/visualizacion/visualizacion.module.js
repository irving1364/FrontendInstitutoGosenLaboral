(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.visualizacion', [])
        .config(visualizacion);

    function visualizacion($stateProvider) {

        $stateProvider.state('app.visualizacion', {
            url: '/visualizacion',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/visualizacion/visualizacion.html',
                    controller : 'visualizacionController'
                }
            }
        });

    }


})();