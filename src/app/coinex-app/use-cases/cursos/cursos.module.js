(function() {

    'use strict';


    angular
        .module('coinex-app.use-cases.cursos', [])
        .config(cursos);

    function cursos($stateProvider) {

        $stateProvider.state('app.cursos', {
            url: '/cursos',
            views  : {
                'toolbar@app':{
                    templateUrl: 'app/coinex-app/directives/toolbar-market/toolbar-market.html',
                    controller: 'ToolbarMarket'
                },

                'content@app': {
                    templateUrl: 'app/coinex-app/use-cases/cursos/cursos.html',
                    controller : 'cursosController'
                }
            }
        });

    }


})();