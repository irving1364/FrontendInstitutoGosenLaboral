(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming )
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;
       // console.log(vm.themes);

        //////////
        if(localStorage.getItem("token") == null ){
            localStorage.clear();
        }
        

        var entorno;

        entorno = 'production';

        if (entorno == 'local'){
            var url = 'http://localhost:8081/backendLaboralMysql/index.php/';
            var urlEvaluaciones = 'http://localhost:8081/backendLaboralMysql/';
            localStorage.setItem('apiUrl', url);
            localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
        }

        if (entorno == 'test'){
            var url = 'http://test.institutogosen.edu.pa/backendLaboralMysql/index.php/';
            var urlEvaluaciones = 'http://test.institutogosen.edu.pa/backendLaboralMysql/';
            localStorage.setItem('apiUrl', url);
            localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
        }

        if (entorno == 'production'){
            var url = 'https://laboralgosen.okey.com.pa/backendLaboralMysql/index.php/';
            var urlEvaluaciones = 'https://laboralgosen.okey.com.pa/backendLaboralMysql/';
            localStorage.setItem('apiUrl', url);
            localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
        }

        moment.locale('es');
    }
})();