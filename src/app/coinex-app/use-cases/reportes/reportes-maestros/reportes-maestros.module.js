(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.reporte-maestro', [])
        .config(reporteMaestro);

    function reporteMaestro($stateProvider) {

        $stateProvider.state('app.reporte-maestro', {
            url: '/reporte-maestro',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/reportes/reportes-maestros/reportes-maestros.html',
                    controller : 'reporteMaestroController'
                }
            }
        });

    }


})();