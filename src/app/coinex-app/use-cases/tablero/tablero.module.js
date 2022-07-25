(function() {

    'use strict';

    angular
        .module('coinex-app.use-cases.tablero', [])
        .config(tablero);

    function tablero($stateProvider) {

        $stateProvider.state('app.tablero', {
            url: '/tablero',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/tablero/tablero.html',
                    controller : 'tableroController'
                }
            }
        });
    }
})();