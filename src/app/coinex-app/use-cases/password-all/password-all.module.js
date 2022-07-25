(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.passwordAll', [])
        .config(passwordAll);

    function passwordAll($stateProvider) {

        $stateProvider.state('app.passwordAll', {
            url: '/passwordAll',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/password-all/password-all.html',
                    controller : 'passwordAllController'
                }
            }
        });

    }


})();