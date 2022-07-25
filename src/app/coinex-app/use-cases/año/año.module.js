(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.año', [])
        .config(año);

    function año($stateProvider) {

        $stateProvider.state('app.año', {
            url: '/año',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/año/año.html',
                    controller : 'añoController'
                }
            }
        });

    }


})();