(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.evaluacionesEstu', [])
        .config(evaluacionesEstu);

    function evaluacionesEstu($stateProvider) {

        $stateProvider.state('app.evaluacionesEstu', {
            url: '/evaluacionesEstu',
            params: {
                evaluacion: null
            },
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/evaluaciones-estu/evaluaciones-estu.html',
                    controller : 'evaluacionesEstuController'
                }
            }
        });

    }


})();