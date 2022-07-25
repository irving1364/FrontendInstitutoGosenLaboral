(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.evaluaciones', [])
        .config(evaluaciones);

    function evaluaciones($stateProvider) {

        $stateProvider.state('app.evaluaciones', {
            url: '/evaluaciones',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/evaluaciones/evaluaciones.html',
                    controller : 'evaluacionesController'
                }
            }
        });

    }


})();