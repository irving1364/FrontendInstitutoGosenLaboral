(function ()
{
    'use strict';

    angular
        .module('app.sample', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        
        $stateProvider
            .state('app.sample', {
                url    : '/sample',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/sample/sample.html',
                        controller : 'SampleController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/sample');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'SAMPLE',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('coinex-app.use-cases', {
            title    : 'dashboard',
            icon     : 'icon-tile-four',
            state    : 'app.dashboard',
            /*stateParams: {
                'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });


        // Navigation
       /* msNavigationServiceProvider.saveItem('coinex-app.use-cases.dashboard', {
            title : 'E-Commerce',
            icon  : 'icon-cart',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('fuse.e-commerce.dashboard', {
            title: 'Dashboard',
            state: 'app.e-commerce.dashboard'
        });

        msNavigationServiceProvider.saveItem('fuse.e-commerce.products', {
            title: 'Products',
            state: 'app.e-commerce.products'
        });

        msNavigationServiceProvider.saveItem('fuse.e-commerce.orders', {
            title: 'Orders',
            state: 'app.e-commerce.orders'
        });*/
    }
})();