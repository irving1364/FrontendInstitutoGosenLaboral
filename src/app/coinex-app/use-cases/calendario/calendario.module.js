(function ()
{
    'use strict';

    angular
        .module('coinex-app.use-cases.calendario', [])
        .config(calendario);

    /** @ngInject */
    function calendario($stateProvider)
    {
        // State
        $stateProvider.state('app.calendario', {
            url      : '/calendario',
            views    : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },
                
                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/calendario/calendario.html',
                    controller : 'calendarioController'
                }
            },
            bodyClass: 'calendar'
        });

    }
})();