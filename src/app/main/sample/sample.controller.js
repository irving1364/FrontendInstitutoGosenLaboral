(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController($scope){
        var vm = this;

        angular.extend($scope, {
            
        });


        // Data
        vm.helloText = 'Hello';

        //TEST SUITE
        var marketInstance = new market({
            nominalCurrency: 'BTC',
            limitCurrency: 'USD',
            lastQuote: '5.2e-7'
        });

        console.log(marketInstance.convert());

    }

    //KOANS
    function market(market) {
        angular.extend(this, market);
    }

    market.prototype = {

        _marketStrategies: function(command) {

            var self = this;

            var markets = {

                'BTC-USD': function(command) {
                    return 'test';
                },

                'BTC-VEF': function(command) {

                },

                'BTC-ARS': function(command) {

                },

                'BTC-LTC': function(command) {
                    
                },

                'BTC-DOG': function(command) {

                },

                'BTC-ETH': function(command) {

                },

                'LTC-BTC': function(command) {

                },

                'LTC-DOG': function(command) {

                },

                'LTC-ETH': function(command) {

                },

                'DOG-BTC': function(command ) {
                    var splitValue, numberX, exponent;

                    splitValue = self.lastQuote.split("e-");
                    numberX = splitValue[0];
                    exponent = Math.pow(10, splitValue[1] - 1);

                    return numberX / exponent;
                },

                'DOG-LTC': function(command) {

                },

                'DOG-ETH': function(command) {

                },

                'ETH-BTC': function(command) {

                },

                'ETH-LTC': function(command) {

                },

                'ETH-DOG': function(command) {

                }

            };

            return markets[this._marketName()](command);
        },

        _marketName: function() {
            return this.nominalCurrency
                            .concat('-')
                            .concat(this.limitCurrency);
        },

        convert: function(command) {
           return this._marketStrategies(command || {});
        },
    }

    
    //END KOANS
    


     
})();
