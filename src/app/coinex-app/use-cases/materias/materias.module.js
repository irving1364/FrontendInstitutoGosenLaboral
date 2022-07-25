(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.materias', [])
        .config(materias);

    function materias($stateProvider) {

        $stateProvider.state('app.materias', {
            url: '/materias',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/materias/materias.html',
                    controller : 'materiasController'
                }
            }
        });

    }


})();