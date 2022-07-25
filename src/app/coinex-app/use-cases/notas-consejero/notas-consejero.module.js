(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.notas-consejero', [])
        .config(notasConsejero);

    function notasConsejero($stateProvider) {

        $stateProvider.state('app.notas-consejero', {
            url: '/notas-consejero',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/notas-consejero/notas-consejero.html',
                    controller : 'notasConsejeroController'
                }
            }
        });

    }


})();