(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.misNotas', [])
        .config(misNotas);

    function misNotas($stateProvider) {

        $stateProvider.state('app.misNotas', {
            url: '/misNotas',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/mis-notas/mis-notas.html',
                    controller : 'misNotasController'
                }
            }
        });

    }


})();