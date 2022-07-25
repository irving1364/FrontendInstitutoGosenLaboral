(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.perfil', [])
        .config(perfil);

    function perfil($stateProvider) {

        $stateProvider.state('app.perfil', {
            url: '/perfil',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/perfil/perfil.html',
                    controller : 'perfilController'
                }
            }
        });

    }


})();