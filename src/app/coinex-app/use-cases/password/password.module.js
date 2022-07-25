(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.password', [])
        .config(password);

    function password($stateProvider) {

        $stateProvider.state('app.password', {
            url: '/password',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/password/password.html',
                    controller : 'passwordController'
                }
            }
        });

    }


})();