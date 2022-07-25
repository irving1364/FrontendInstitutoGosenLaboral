(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.dashboard', [])
        .config(dashboard);

    function dashboard($stateProvider) {

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/dashboard/dashboard.html',
                    controller : 'dashboardController'
                }
            }
        });

    }


})();