(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.clases', [])
        .config(clases);

    function clases($stateProvider) {

        $stateProvider.state('app.clases', {
            url: '/clases',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/clases/clases.html',
                    controller : 'clasesController'
                }
            }
        });

    }


})();