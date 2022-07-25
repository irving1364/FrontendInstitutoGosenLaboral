(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.maestros', [])
        .config(maestros);

    function maestros($stateProvider) {

        $stateProvider.state('app.maestros', {
            url: '/maestros',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/maestros/maestros.html',
                    controller : 'maestrosController'
                }
            }
        });

    }


})();