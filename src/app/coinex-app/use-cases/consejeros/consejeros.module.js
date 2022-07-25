(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.consejeros', [])
        .config(consejeros);

    function consejeros($stateProvider) {

        $stateProvider.state('app.consejeros', {
            url: '/consejeros',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/consejeros/consejeros.html',
                    controller : 'consejerosController'
                }
            }
        });

    }


})();