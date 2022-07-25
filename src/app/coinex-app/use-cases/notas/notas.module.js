(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.notas', [])
        .config(notas);

    function notas($stateProvider) {

        $stateProvider.state('app.notas', {
            url: '/notas',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/notas/notas.html',
                    controller : 'notasController'
                }
            }
        });

    }


})();